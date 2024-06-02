Setup Instructions
Use the command npm i to initialize the project.
User Interface Features
Customers can:

Register in our system.
Log in.
Browse different products.
Create a shopping cart and complete purchases.
API Functionalities
The API provides the following capabilities for customers:

Register.
Log in.
For the following routes, the appropriate token must be sent in the header:
3. Search for products.

Retrieve all products.
Retrieve their orders.
Create a new order with one or more products.
Administrator Capabilities
There must be an administrator user in the database, who can perform the following actions using the provided CURL commands:

Register.
Log in.
For the following routes, the appropriate token must be sent in the header:
3. Retrieve all customers.

Retrieve all products.
Modify a product (using the PUT method).
Add a new product.
Resources Provided
NPM libraries.
CURL commands.
Database scripts and queries needed to start working on the project, provided in their respective .txt files.
Important Note
When using the CURL commands, a token will be provided which must be replaced by the word "TOKEN" in the written commands.

Configuration
The .env file can be modified according to the user’s preferences and needs.

Development and Usage Tools
The following software and technologies were used for development:

Visual Studio Code
-XAMPP
-Microsoft Edge
-MySQL
-JWT (JSON Web Tokens)
-Bcrypt
-Node.js
