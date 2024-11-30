# ESP Sensors Analyzer

ESP Sensors Analyzer is a lightweight and powerful web application for visualizing temperature and gas measurements collected from ESP-based sensors. This project provides real-time graphs and charts to help you analyze sensor data effortlessly.

---

## Features

- 📊 **Interactive Graphs and Charts**: Real-time visualization of temperature and gas measurements.
- 🌡️ **Sensor Data Monitoring**: Fetch and display data from your ESP devices with minimal configuration.
- 🚀 **Lightweight and Fast**: Built with modern web technologies for optimal performance.
- ⚙️ **Customizable and Scalable**: Easily extend or integrate with other IoT systems.

---

## Getting Started

### Prerequisites

- An ESP32 or similar microcontroller with connected sensors (e.g., MQ2 for gas detection, DHT11 for temperature and humidity).
- A stable Wi-Fi connection for the ESP device to communicate with the web application.
- Node.js and npm/yarn installed on your system.

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chronosgit/esp-sensors-analyzer.git
   cd esp-sensors-analyzer
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure ESP Device and the environmental variables**
4. **Start the Application**
   ```bash
   npm run dev
   ```

---

## How It Works

- The ESP device collects temperature and gas data using connected sensors.

- Data is sent to the web application via an API or WebSocket.

- The application processes the data and visualizes it with dynamic charts and graphs.

---

## Technologies Used

- Frontend: Nuxt 3, Typescript, Tailwind CSS, Chart.js, pinia etc.

- Backend: Node.js, MongoDB, Mongoose

- ESP Firmware: Arduino, ESP32, DHT11, MQ2
