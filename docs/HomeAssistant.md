Home Assistant Setup and Usage Guide (Using Docker)

Home Assistant is an open-source home automation platform that allows you to control and automate devices in your home. This guide explains how to set up Home Assistant using Docker and access its web-based user interface (UI).

### Prerequisites
1. Docker and Docker Compose installed on your system.
2. A computer or Raspberry Pi to run Docker containers.
3. A stable internet connection.
4. Basic knowledge of Docker and networking.

### Steps to Run Home Assistant with Docker
1. **Prepare the Environment**:
    - Ensure Docker and Docker Compose are installed on your system. Refer to the official Docker documentation for installation instructions: https://docs.docker.com/get-docker/.

2. **Start the Home Assistant Container**:
    - Run the following command to start the container:
      ```bash
      \\docker\\docker-compose up -d
      ```
    - This will download the Home Assistant image (if not already available) and start the container.

3. **Access the Web UI**:
    - Open a web browser and navigate to `http://localhost:8123`.
    - The default port for Home Assistant is `8123`.

4. **Sign In**:
    - Username: iot12345
    - Password: IOT12345

5. **Stop the Home Assistant Container**:
    - Run the following command to start the container:
      ```bash
      \\docker\\docker-compose stop
      ```
