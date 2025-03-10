const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Connect to SQLite Database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
        initializeDatabase();
    }
});

// ✅ Initialize Database
function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("✅ Users table is ready.");
        }
    });
}

// ✅ Fetch All Users
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// ✅ Add New User
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "⚠️ Name and email are required." });
    }

    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "✅ User added successfully!", id: this.lastID });
    });
});

// ✅ Delete User
app.delete('/users/:email', (req, res) => {
    const { email } = req.params;
    
    db.run("DELETE FROM users WHERE email = ?", [email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "✅ User deleted successfully!" });
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
