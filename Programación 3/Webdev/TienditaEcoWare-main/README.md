# Project Setup and Instructions

Before starting the project and after installing it, delete the `package.json` and `package-lock.json` files. If you follow the instructions, these files will be regenerated with updated information.

## Project Overview

This project is a simple online store that allows the following:

### Setup Instructions

1. Use the command `npm i` to initialize the project.

### User Interface Features

Customers can:
- Register in our system.
- Log in.
- Browse different products.
- Create a shopping cart and complete purchases.

### API Functionalities

The API provides the following capabilities for customers:

1. Register.
2. Log in.

For the following routes, the appropriate token must be sent in the header:

3. Search for products.
4. Retrieve all products.
5. Retrieve their orders.
6. Create a new order with one or more products.

### Administrator Capabilities

There must be an administrator user in the database, who can perform the following actions using the provided CURL commands:

1. Register.
2. Log in.

For the following routes, the appropriate token must be sent in the header:

3. Retrieve all customers.
4. Retrieve all products.
5. Modify a product (using the PUT method).
6. Add a new product.

### Resources Provided

- NPM libraries
- CURL commands
- Database scripts and queries needed to start working on the project, provided in their respective `.txt` files.

### Important Note

When using the CURL commands, a token will be provided which must be replaced by the word "TOKEN" in the written commands.

### Configuration

The `.env` file can be modified according to the user’s preferences and needs.

### Development and Usage Tools

The following software and technologies were used for development:

1. Visual Studio Code
2. XAMPP
3. Microsoft Edge
4. MySQL
5. JWT (JSON Web Tokens)
6. Bcrypt
7. Node.js
