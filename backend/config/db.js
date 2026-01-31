require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host:'mysql_c',      // docker service name
  user:'user',       // from docker-compose
  password:'userpassword',
  database:'mydb',
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
