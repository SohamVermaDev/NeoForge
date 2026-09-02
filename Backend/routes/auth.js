require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const db = require("../db");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
    ]);
    if (rows.length === 0) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query(
                "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
                [username, hashedPassword, email, "user"]
            );
            res.json({
                message: "User registered successfully!",
                id: result.insertId,
                user: { username, email },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to register user!" });
        }
    } else {
        res.status(409).json({ error: "Username already taken!" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query(
            "SELECT id, username, password, email, role FROM users WHERE email = ?",
            [email]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password!" });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Successful login!",
            token: token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed!" });
    }
});

module.exports = router;
