require("dotenv").config();

const requiredEnv = [
    "PORT",
    "JWT_SECRET",
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
];

const missingEnv = requiredEnv.filter((key) => process.env[key] === undefined);

if (missingEnv.length > 0) {
    console.error(`Missing environment variables: ${missingEnv.join(", ")}`);
    process.exit(1);
}

if (!process.env.PORT.trim() || !Number.isInteger(Number(process.env.PORT))) {
    console.error(
        `PORT must be a valid integer. Current value: ${process.env.PORT}`
    );
    process.exit(1);
}

if (process.env.JWT_SECRET.length < 16) {
    console.error("JWT_SECRET must be at least 16 characters long.");
    process.exit(1);
}

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth");

const { testConnection } = require("./db");

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 50,

    handler: (_req, res) => {
        res.status(429).json({ error: "Too many attempts!" });
    },
});

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(limiter);

app.use("/auth", limiter, authRoutes);

app.get("/", (_req, res) => {
    res.send("<h1>CAN BE /GET!</h1>");
});

async function startServer() {
    try {
        console.log("Testing database connection...");
        await testConnection();
        console.log("Database connection safe and verified.");

        app.listen(port, () => {
            console.log(`NeoForge Backend listening on port ${port}`);
        });
    } catch (error) {
        console.error("Database connection failed during startup!");
        console.error(error.message);

        process.exit(1);
    }
}

startServer();
