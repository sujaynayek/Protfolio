const express = require("express");
const path = require("path");
const mysql = require("mysql2");
require('dotenv').config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MySQL DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Create table (run this once)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contact_queries (
   id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
db.query(createTableQuery);

// API route
app.post("/submit-query", (req, res) => {
  const { name, email, message } = req.body;

  const insertQuery = `
    INSERT INTO contact_queries (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error saving to DB:", err);
      return res.status(500).send("Something went wrong");
    }

    console.log("Query saved:", result.insertId);
    res.send("Thank you! Your query has been submitted.");
  });
});

// Start server
const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
