const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const loginRequest = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.code || `Login failed (${response.status})`);
    }

    return await response.json();
};

export const registerRequest = async (username, email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.code || `Registration failed (${response.status})`);
    }

    return await response.json();
};
