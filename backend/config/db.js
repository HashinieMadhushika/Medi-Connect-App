require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',      // docker service name
   user: process.env.DB_USER || 'user',       // from docker-compose
   password: process.env.DB_PASSWORD || 'userpassword',
   database: process.env.DB_NAME || 'mydb',
});



function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL, retrying in 5s:', err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to MySQL database');
    }
  });
}

connectWithRetry();

module.exports = db;
