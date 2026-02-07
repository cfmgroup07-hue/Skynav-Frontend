const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Save a flight search to history
 */
export const saveSearch = async (searchData, token) => {
    try {
        const response = await fetch(`${API_URL}/search/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(searchData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to save search',
        };
    }
};

/**
 * Get user's search history
 */
export const getSearchHistory = async (token, limit = 20, page = 1) => {
    try {
        const response = await fetch(`${API_URL}/search/history?limit=${limit}&page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to fetch search history',
        };
    }
};

/**
 * Clear user's search history
 */
export const clearSearchHistory = async (token) => {
    try {
        const response = await fetch(`${API_URL}/search/history`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to clear history',
        };
    }
};
