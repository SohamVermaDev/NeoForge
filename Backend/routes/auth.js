const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { db } = require("../db");
const validateAuthInput = require("../middleware/authValidation");
const router = express.Router();

router.post(
    "/register",
    validateAuthInput({ requireUsername: true }),
    async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const [existingUsers] = await db.query(
                "SELECT 1 FROM users WHERE username = ? OR email = ? LIMIT 1",
                [username, email]
            );

            if (existingUsers.length > 0) {
                return res
                    .status(409)
                    .json({ code: "unable_to_create_account" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await db.query(
                "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
                [username, hashedPassword, email, "user"]
            );

            res.status(201).json({
                code: "account_created",
                id: result.insertId,
                user: { username, email },
            });
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res
                    .status(409)
                    .json({ code: "unable_to_create_account" });
            }

            console.error(err);
            res.status(500).json({ code: "failed_to_register_user" });
        }
    }
);

router.post("/login", validateAuthInput(), async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query(
            "SELECT id, username, password, email, role FROM users WHERE email = ? LIMIT 1",
            [email]
        );
        if (rows.length === 0) {
            return res.status(401).json({ code: "invalid_credentials" });
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ code: "invalid_credentials" }); 
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

        res.status(200).json({
            code: "login_successful",
            token: token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ code: "failed_to_login" });
    }
});

module.exports = router;
