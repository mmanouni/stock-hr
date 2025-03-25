# Stock HR Server

## Overview
The Stock HR Server is a backend service that manages stock and HR-related operations. It provides APIs for managing employee records, stock inventory, and other related functionalities.

## Features
- Employee management
- Stock inventory management
- Reporting and analytics
- Authentication and authorization

## Requirements
- Node.js >= 14.x
- MongoDB >= 4.x

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/stock-hr-server.git
    ```
2. Navigate to the project directory:
    ```sh
    cd stock-hr-server
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/stock-hr
    JWT_SECRET=your_jwt_secret
    ```

## Running the Server
Start the server with the following command:
```sh
npm start
```
The server will be running at `http://localhost:3000`.

## API Documentation
API documentation is available at `http://localhost:3000/api-docs` once the server is running.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Development
This project is under active development. For any inquiries, please contact mmanouni@gmail.com.
