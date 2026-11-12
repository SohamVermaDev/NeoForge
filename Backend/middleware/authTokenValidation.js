const jwt = require("jsonwebtoken");

const validateAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ code: "no_token_attached" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ code: "invalid_token" });
        }

        req.user = decoded;

        if (req.user.role !== "admin") {
            return res.status(403).json({ code: "admin_access_required" });
        }

        next();
    });
};

module.exports = validateAdminToken;
