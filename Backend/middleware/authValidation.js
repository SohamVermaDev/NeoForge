const usernamePattern = /^[a-zA-Z0-9_]+$/;
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

const validateAuthInput = ({ requireUsername = false } = {}) => {
    return (req, res, next) => {
        const { username, email, password } = req.body || {};

        if (requireUsername) {
            if (typeof username !== "string" || !username.trim()) {
                return res.status(422).json({ code: "username_required" });
            }

            if (!usernamePattern.test(username.trim())) {
                return res.status(422).json({ code: "invalid_username" });
            }

            if (username.trim().length < 3) {
                return res.status(422).json({ code: "username_too_short" });
            }

            if (username.trim().length > 25) {
                return res.status(422).json({ code: "username_too_long" });
            }
        }

        req.body.username = username.trim();

        if (typeof email !== "string" || !email.trim()) {
            return res.status(422).json({ code: "email_required" });
        }

        if (email.length > 254) {
            return res.status(422).json({ code: "email_too_long" });
        }

        if (!emailPattern.test(email.trim())) {
            return res.status(422).json({ code: "invalid_email" });
        }

        req.body.email = email.trim().toLowerCase();

        if (typeof password !== "string" || password.length < 6) {
            return res.status(422).json({
                code: "password_too_short",
            });
        }

        next();
    };
};

module.exports = validateAuthInput;
