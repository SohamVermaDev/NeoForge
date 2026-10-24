const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const [games] = await db.query(
            "SELECT * FROM games WHERE deleted_at IS NULL"
        );

        const formattedGames = games.map((game) => ({
            ...game,
            price: parseFloat(game.price),
            rating: parseFloat(game.rating),
            platforms: JSON.parse(game.platforms || "[]"),
        }));

        return res.status(200).json({ formattedGames });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: "failed_to_fetch_games" });
    }
});

module.exports = router;
