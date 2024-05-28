import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
    port: 3310 
});

// Test the connection
db.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
