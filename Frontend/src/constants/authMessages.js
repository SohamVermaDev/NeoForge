const AUTH_MESSAGES = {
    // Success
    account_created: {
        text: "Account forged! Redirecting to sign in...",
        type: "success",
    },
    login_successful: {
        text: "Welcome back, Champion! Redirecting...",
        type: "success",
    },

    // Warnings
    too_many_requests: {
        text: "Too many attempts. Please wait a few minutes before trying again.",
        type: "warning",
    },

    // Validation Errors
    username_required: {
        text: "Please enter a username.",
        type: "error",
    },
    username_too_long: {
        text: "Username must be 100 characters or fewer.",
        type: "error",
    },
    email_required: {
        text: "Please enter your email address.",
        type: "error",
    },
    email_too_long: {
        text: "This email address is too long.",
        type: "error",
    },
    invalid_email: {
        text: "Please enter a valid email address.",
        type: "error",
    },
    password_too_short: {
        text: "Password must be at least 6 characters.",
        type: "error",
    },

    // Auth Errors
    invalid_credentials: {
        text: "Email or password is incorrect. Please try again.",
        type: "error",
    },
    unable_to_create_account: {
        text: "We couldn't create your account. Try a different username or email.",
        type: "error",
    },

    // Server Errors
    failed_to_register_user: {
        text: "We couldn't complete your registration. Please try again in a moment.",
        type: "error",
    },
    failed_to_login: {
        text: "We couldn't sign you in right now. Please try again in a moment.",
        type: "error",
    },
};

const DEFAULT_ERROR = {
    text: "Something went wrong. Please try again.",
    type: "error",
};

const getAuthMessage = (code) => {
    return AUTH_MESSAGES[code] || DEFAULT_ERROR;
};

export default getAuthMessage;
