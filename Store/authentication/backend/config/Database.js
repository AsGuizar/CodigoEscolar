import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
    port: 3310 // Specify the MySQL port explicitly
});

export default db;
