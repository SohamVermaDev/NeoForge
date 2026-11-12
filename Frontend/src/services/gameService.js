const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchGamesRequest = async (token) => {
    const response = await fetch(`${API_BASE}/api/games`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.code || `Fetching games failed (${response.status})`);
    }

    const data = await response.json();
    return data.formattedGames;
};
