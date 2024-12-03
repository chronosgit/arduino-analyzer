#include "DHT.h"
#include "MQUnifiedsensor.h"
#include "WiFi.h"
#include <WebServer.h>

// Constants

#define BOARD "Arduino UNO"
#define DHT_PIN 4
#define DHT_TYPE DHT11
#define MQ_PIN A0
#define MQ_TYPE "MQ-2"
#define MQ_V_RESOLUTION 5
#define MQ_ADC_BIT_RESOLUTION 10
#define MQ_RATIO_CLEAN_AIR 9.83

// Initializatios

MQUnifiedsensor MQ(BOARD, MQ_V_RESOLUTION, MQ_ADC_BIT_RESOLUTION, MQ_PIN, MQ_TYPE);
DHT dht(DHT_PIN, DHT_TYPE);
WebServer server(80); 

// Types and interfaces

struct TemperatureHumidityData {
  bool isCelsius;    
  float temperature; 
  float humidity; 
};

struct GasReadings {
  float lpg;
  float methane;
  float smoke;
  float hydrogen;
  float ethanol;
  float butane;
  float co;
};

void setupDHT();
void setupMQ();
void calibrateMQ();

void scanWifi();
void connectToWiFi(const char* ssid, const char* password);
String getIpAddress();
void handleApiV1();

TemperatureHumidityData readDHTData();
GasReadings readMQData();
bool isDhtOutputValid(float humidity, float temperature);

// Main

void setup() {
  Serial.begin(9600);
  
  setupDHT();
  // setupMQ();

  connectToWiFi("sarbaz", "zhibulya72");
  
  String ipAddress = getIpAddress();
  Serial.print("IP Address: ");
  Serial.println(ipAddress);

  server.on("/api/v1/healthcheck", HTTP_GET, handleApiV1GetHealthCheck);
  
  server.begin();
}

void loop() {
  TemperatureHumidityData dhtData = readDHTData();
  // GasReadings mqData = readMQData();

  server.handleClient();

  delay(1000);

  // scanWifi(); 
  // printTemperatureHumidityData(dhtData);
}

// API

void handleApiV1GetHealthCheck() {
  bool isConnected = (WiFi.status() == WL_CONNECTED);

  String message = isConnected ? "Connected to WiFi" : "Not connected to WiFi";
  String ipAddress = isConnected ? WiFi.localIP().toString() : "N/A";
  
  String response = "{\"status\":" + String(isConnected ? "true" : "false") + 
                    ",\"message\":\"" + message + 
                    "\",\"data\":\"" + ipAddress + "\"}";

  server.send(200, "application/json", response);
}


// Sensors

TemperatureHumidityData readDHTData() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Check if reading is valid
  if (!isDhtOutputValid(humidity, temperature)) {
    Serial.println(F("Failed to read from DHT sensor!"));

    return { false, 0.0, 0.0 };
  }

  return { true, temperature, humidity }; // assuming Celsius
}


GasReadings readMQData() {
  MQ.update();

  // Slope (A) and intercept (B) are based on the MQ2 datasheet. 
  // Calibration is required for precise readings.
  MQ.setA(574.25); 
  MQ.setB(-2.222); 
  float lpg = MQ.readSensor();

  // Methane sensitivity values are taken from the datasheet. 
  // These are approximate; calibration improves accuracy.
  MQ.setA(423.63); // Datasheet slope for methane
  MQ.setB(-2.178); // Datasheet intercept for methane
  float methane = MQ.readSensor();

  // Smoke sensitivity values are generalized from combustion-related gases.
  // The MQ2 datasheet does not provide specific smoke regression values.
  MQ.setA(700.00); // Approximated slope for smoke
  MQ.setB(-2.1);   // Approximated intercept for smoke
  float smoke = MQ.readSensor();

  // Values for Hydrogen are from the datasheet but require tuning for real use.
  MQ.setA(987.99); // Datasheet slope for hydrogen
  MQ.setB(-2.162); // Datasheet intercept for hydrogen
  float hydrogen = MQ.readSensor();

  // Ethanol sensitivity values are not explicitly in the datasheet. 
  // Placeholder values are based on experimental calibration.
  MQ.setA(1000.00); // Placeholder slope for ethanol
  MQ.setB(-2.24);   // Placeholder intercept for ethanol
  float ethanol = MQ.readSensor();

  // Butane regression parameters require custom calibration since 
  // datasheet values for butane are not well-defined.
  MQ.setA(1000.00); // Placeholder slope for butane
  MQ.setB(-2.3);    // Placeholder intercept for butane
  float butane = MQ.readSensor();

  // Values for CO sensitivity from the MQ2 datasheet.
  MQ.setA(605.18); // Datasheet slope for CO
  MQ.setB(-2.32);  // Datasheet intercept for CO
  float co = MQ.readSensor();

  return { lpg, methane, smoke, hydrogen, ethanol, butane, co };
}


bool isDhtOutputValid(float humidity, float temperature) {
  return !(isnan(humidity) || isnan(temperature));
}

void printTemperatureHumidityData(const TemperatureHumidityData& data) {
  if (data.isCelsius) {
    Serial.print(F("Temperature: "));
    Serial.print(data.temperature);
    Serial.println(F("°C"));
  } else {
    // If you want to convert to Fahrenheit, uncomment this section
    // float fahrenheit = data.temperature * 9.0 / 5.0 + 32;
    // Serial.print(F("Temperature: "));
    // Serial.print(fahrenheit);
    // Serial.println(F("°F"));
  }
}


void printGasReadings(const GasReadings& readings) {
  Serial.print("LPG: ");
  Serial.print(readings.lpg);

  Serial.print(" ppm | Methane: ");
  Serial.print(readings.methane);

  Serial.print(" ppm | Smoke: ");
  Serial.print(readings.smoke);

  Serial.print(" ppm | Hydrogen: ");
  Serial.print(readings.hydrogen);

  Serial.print(" ppm | Ethanol: ");
  Serial.print(readings.ethanol);

  Serial.print(" ppm | Butane: ");
  Serial.print(readings.butane);

  Serial.print(" ppm | CO: ");
  Serial.print(readings.co);
  Serial.println(" ppm");
}

// WiFi

void scanWifi() {
  Serial.println("Scan start");

  int n = WiFi.scanNetworks();
  Serial.println("Scan done");
  
  if (n == 0) {
    Serial.println("No networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    Serial.println("Nr | SSID                             | RSSI | CH | Encryption");
    
    for (int i = 0; i < n; ++i) {
      Serial.printf("%2d | %-32.32s | %4ld | %2ld | ", i + 1, WiFi.SSID(i).c_str(), WiFi.RSSI(i), WiFi.channel(i));
      
      switch (WiFi.encryptionType(i)) {
        case WIFI_AUTH_OPEN:            Serial.print("Open"); break;
        case WIFI_AUTH_WEP:             Serial.print("WEP"); break;
        case WIFI_AUTH_WPA_PSK:         Serial.print("WPA"); break;
        case WIFI_AUTH_WPA2_PSK:        Serial.print("WPA2"); break;
        case WIFI_AUTH_WPA_WPA2_PSK:    Serial.print("WPA+WPA2"); break;
        case WIFI_AUTH_WPA2_ENTERPRISE: Serial.print("WPA2-EAP"); break;
        case WIFI_AUTH_WPA3_PSK:        Serial.print("WPA3"); break;
        case WIFI_AUTH_WPA2_WPA3_PSK:   Serial.print("WPA2+WPA3"); break;
        case WIFI_AUTH_WAPI_PSK:        Serial.print("WAPI"); break;
        default:                        Serial.print("Unknown");
      }
      Serial.println();
    }
  }

  WiFi.scanDelete(); // Free memory after scanning
  Serial.println();
}

void connectToWiFi(const char* ssid, const char* password) {
  Serial.println("Connecting to WiFi...");
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected to WiFi!");
}

String getIpAddress() {
  return WiFi.localIP().toString();  // Return the local IP address of the ESP32
}

// Setups

void setupDHT() {
  dht.begin();
}

void setupMQ() {
  MQ.setRegressionMethod(1); // Use logarithmic regression for calculations
  MQ.setA(574.25);           // Slope for LPG (refer to datasheet)
  MQ.setB(-2.222);           // Intercept for LPG
  MQ.init();                 // Initialize MQ2 sensor
  calibrateMQ();             // Calibrate MQ2 sensor
}

void calibrateMQ() {
  Serial.print("Calibrating MQ2 sensor. Please wait ");
  float calcR0 = 0;          // Accumulate R0 values for averaging
  const int numSamples = 10; // Number of samples for calibration

  for (int i = 1; i <= numSamples; i++) {
    MQ.update();                                // Update sensor reading
    calcR0 += MQ.calibrate(MQ_RATIO_CLEAN_AIR); // Calibrate using clean air ratio
    delay(500);                                 // Allow sensor to stabilize
    Serial.print(".");
  }

  calcR0 /= numSamples; // Calculate average R0
  MQ.setR0(calcR0);     // Set the calibrated R0 value
  Serial.println(" done!");

  // Check for calibration errors
  if (isinf(calcR0)) {
    Serial.println("Error: R0 is infinite. Check wiring or power supply.");
    while (1); // Halt execution
  } else if (calcR0 == 0) {
    Serial.println("Error: R0 is zero. Check wiring or power supply.");
    while (1); // Halt execution
  } else {
    Serial.print("Calibration successful. R0 = ");
    Serial.println(calcR0);
  }

  MQ.serialDebug(true); // Enable debugging for troubleshooting (optional)
}
