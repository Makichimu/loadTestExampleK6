# Simple CRUD API with K6 Performance Testing and InfluxDB

This project includes:
- A simple CRUD API built with Node.js and Express.js.
- Performance testing of the API using K6.
- Storing performance metrics in InfluxDB.

## Project Structure

- `api/`: the Node.js API code
  - `Dockerfile.api`: Dockerfile for the API
  - `app.js`: main API logic
- `k6/`: K6 scripts
  - `test.js`: K6 load testing script for the API
- `docker-compose.yml`: Docker Compose configuration to run all services (API, InfluxDB, and K6)

## Requirements

- Docker and Docker Compose must be installed on your machine:
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

## Running the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/simple-crud-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd simple-crud-api
    ```

3. Start the containers using Docker Compose:

    ```bash
    docker compose up --build
    ```

4. Services:
   - The API will be available at: `http://localhost:3000`
   - K6 will automatically run load tests and send the results to InfluxDB.
   - InfluxDB will be available on port `8086` for external clients (like Grafana) if you wish to visualize the data.

## Docker Compose Structure

### API

The API is built using Node.js and Express.js and runs inside a Docker container. The API listens on port 3000 and provides basic CRUD operations for managing items.

### InfluxDB

InfluxDB is used to store performance data collected from K6 tests.

### K6

K6 runs the `test.js` load testing script, and the results are sent to InfluxDB for analysis.

## API Load Testing with K6

After running `docker-compose up --build`, K6 will automatically start executing the load tests that cover the following API operations:

- Creating an item (POST `/items`)
- Retrieving all items (GET `/items`)

The performance metrics will be sent to InfluxDB, where you can analyze them using tools like Grafana.

## Useful Commands

- **Stop containers**: 

    ```bash
    docker compose down
    ```

- **Restart containers without rebuilding**: 

    ```bash
    docker compose up
    ```

- **Rebuild images and start containers**:

    ```bash
    docker compose up --build
    ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
