require("dotenv").config();

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
app.use(cors());
app.use(limiter);

app.use("/auth", authRoutes);

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
