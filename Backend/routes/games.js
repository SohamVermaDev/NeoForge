const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const [games] = await db.query(
            "SELECT * FROM games WHERE deleted_at IS NULL"
        );

        if (games.length > 0) {
            return res.status(200).json({ games });
        } else {
            return res.status(204).json({ code: "no_games_found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: "failed_to_fetch_games" });
    }
});

module.exports = router;
