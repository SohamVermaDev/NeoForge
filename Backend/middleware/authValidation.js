const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateAuthInput = ({ requireUsername = false } = {}) => {
    return (req, res, next) => {
        const { username, email, password } = req.body || {};

        if (
            requireUsername &&
            (typeof username !== "string" || !username.trim())
        ) {
            return res.status(400).json({ code: "username_required" });
        }

        if (requireUsername && username.length > 100) {
            return res.status(400).json({ code: "username_too_long" });
        }

        if (typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ code: "email_required" });
        }

        if (email.length > 254) {
            return res.status(400).json({ code: "email_too_long" });
        }

        if (!emailPattern.test(email.trim())) {
            return res.status(400).json({ code: "invalid_email" });
        }

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                code: "password_too_short",
            });
        }

        next();
    };
};

module.exports = validateAuthInput;
