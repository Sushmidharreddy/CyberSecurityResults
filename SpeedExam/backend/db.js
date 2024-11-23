const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Add your database user
  password: '', // Add your database password
  database: 'QTResults',
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Database Connected Successfully');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = db;
