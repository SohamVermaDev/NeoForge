const GAME_ERRORS = {
    failed_to_fetch_games: {
        icon: "fa-solid fa-triangle-exclamation",
        heading: "Server error",
        subtext: "The forge is having trouble right now. Please try again in a moment.",
    },
    offline: {
        icon: "fa-solid fa-wifi",
        heading: "You're offline",
        subtext: "Check your internet connection and try again.",
    },
};

const DEFAULT_ERROR = {
    icon: "fa-solid fa-circle-exclamation",
    heading: "Something went wrong",
    subtext: "An unexpected error occurred while fetching the games.",
};

const getGameErrorMessage = (code) => {
    return GAME_ERRORS[code] || DEFAULT_ERROR;
};

export default getGameErrorMessage;
