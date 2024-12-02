#include "DHT.h"
#include "MQUnifiedsensor.h"
#include "WiFi.h"
#include <WebServer.h>

// Constants

#define BOARD "Arduino UNO"
#define DHT_PIN 2
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

// Function prototypes

void setupDHT();
void setupMQ();
void calibrateMQ();

void scanWifi();
void connectToWiFi(const char* ssid, const char* password);
String getIpAddress();
void handleApiV1();

void readDHTData();
void readMQData();
bool isDhtOutputValid(float humidity, float temperature);

// Main

void setup() {
  Serial.begin(9600);
  
  // setupDHT();
  // setupMQ();

  // Connect to WiFi
  connectToWiFi("sarbaz", "zhibulya72");
  
  // Get and print IP address
  String ipAddress = getIpAddress();
  Serial.print("IP Address: ");
  Serial.println(ipAddress);

  // Setup WebServer Routes
  server.on("/api/v1/healthcheck", HTTP_GET, handleApiV1GetHealthCheck);
  
  // Start the server
  server.begin();
}

void loop() {
  // readDHTData();
  // readMQData();

  // scanWifi();

  server.handleClient();

  delay(1000);
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


// Readers

void readDHTData() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (!isDhtOutputValid(humidity, temperature)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.println(F("%"));

  Serial.print(F("Temperature: "));
  Serial.print(temperature);
  Serial.println(F("°C"));
}

void readMQData() {
  MQ.update();    // Update data from the analog pin
  MQ.readSensor(); // Read PPM concentration
  MQ.serialDebug(); // Print sensor readings to Serial
}

// Utilities

bool isDhtOutputValid(float humidity, float temperature) {
  return !(isnan(humidity) || isnan(temperature));
}

// WiFi

void scanWifi() {
  Serial.println("Scan start");

  int n = WiFi.scanNetworks(); // Number of networks found
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
  
  // Wait for the connection to succeed
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
  MQ.setRegressionMethod(1); // Use the regression model for calculations
  MQ.setA(574.25); 
  MQ.setB(-2.222); 
  MQ.init();
  calibrateMQ();
}

void calibrateMQ() {
  Serial.print("MQ is calibrating. Please wait ");
  float calcR0 = 0;

  for (int i = 1; i <= 10; i++) {
    MQ.update();
    calcR0 += MQ.calibrate(MQ_RATIO_CLEAN_AIR);
    Serial.print(".");
  }

  MQ.setR0(calcR0 / 10);
  Serial.println(" done!");

  if (isinf(calcR0)) {
    Serial.println("Error: R0 is infinite. Check wiring or power supply.");
    while (1);
  }

  if (calcR0 == 0) {
    Serial.println("Error: R0 is zero. Check wiring or power supply.");
    while (1);
  }

  MQ.serialDebug(true);
}
