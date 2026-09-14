const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateAuthInput = ({ requireUsername = false } = {}) => {
    return (req, res, next) => {
        const { username, email, password } = req.body || {};

        if (
            requireUsername &&
            (typeof username !== "string" || !username.trim())
        ) {
            return res.status(400).json({ error: "Username is required." });
        }

        if (requireUsername && username.length > 100) {
            return res
                .status(400)
                .json({ error: "Username must not exceed 100 characters." });
        }

        if (typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ error: "Email is required." });
        }

        if (email.length > 254) {
            return res
                .status(400)
                .json({ error: "Email must not exceed 254 characters." });
        }

        if (!emailPattern.test(email.trim())) {
            return res
                .status(400)
                .json({ error: "Please provide a valid email." });
        }

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long.",
            });
        }

        next();
    };
};

module.exports = validateAuthInput;
