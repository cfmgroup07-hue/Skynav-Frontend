const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Update user profile
 */
export const updateProfile = async (profileData, token) => {
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to update profile',
        };
    }
};

/**
 * Change password (local users only)
 */
export const changePassword = async (currentPassword, newPassword, token) => {
    try {
        const response = await fetch(`${API_URL}/auth/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to change password',
        };
    }
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${API_URL}/auth/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to request password reset',
        };
    }
};

/**
 * Get current user
 */
export const getCurrentUser = async (token) => {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
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
            message: 'Network error - Unable to get user info',
        };
    }
};
