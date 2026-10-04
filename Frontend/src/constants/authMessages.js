const AUTH_MESSAGES = {
    // Success
    account_created: {
        text: "Account forged! Redirecting to sign in...",
        type: "success",
        affected: [],
    },
    login_successful: {
        text: "Welcome back, Champion! Redirecting...",
        type: "success",
        affected: [],
    },

    // Warnings
    too_many_requests: {
        text: "Too many attempts. Please wait a few minutes before trying again.",
        type: "warning",
        affected: [],
    },

    // Validation Errors
    username_required: {
        text: "Please enter a username.",
        type: "error",
        affected: ["username"],
    },
    invalid_username: {
        text: "Usernames can only contain letters, numbers, and underscores.",
        type: "error",
        affected: ["username"],
    },
    username_too_long: {
        text: "Username must be 25 characters or fewer.",
        type: "error",
        affected: ["username"],
    },
    username_too_short: {
        text: "Username must be 3 characters or more.",
        type: "error",
        affected: ["username"],
    },
    email_required: {
        text: "Please enter your email address.",
        type: "error",
        affected: ["email"],
    },
    email_too_long: {
        text: "This email address is too long.",
        type: "error",
        affected: ["email"],
    },
    invalid_email: {
        text: "Please enter a valid email address.",
        type: "error",
        affected: ["email"],
    },
    password_too_short: {
        text: "Password must be at least 6 characters.",
        type: "error",
        affected: ["password"],
    },

    // Auth Errors
    invalid_credentials: {
        text: "Email or password is incorrect. Please try again.",
        type: "error",
        affected: ["email", "password"],
    },
    unable_to_create_account: {
        text: "We couldn't create your account. Try a different username or email.",
        type: "error",
        affected: ["username", "email"],
    },

    // Server Errors
    failed_to_register_user: {
        text: "We couldn't complete your registration. Please try again in a moment.",
        type: "error",
        affected: [],
    },
    failed_to_login: {
        text: "We couldn't sign you in right now. Please try again in a moment.",
        type: "error",
        affected: [],
    },
};

const DEFAULT_ERROR = {
    text: "Something went wrong. Please try again.",
    type: "error",
    affected: [],
};

const getAuthMessage = (code) => {
    return AUTH_MESSAGES[code] || DEFAULT_ERROR;
};

export default getAuthMessage;
