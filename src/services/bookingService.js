const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Create a new booking
 */
export const createBooking = async (bookingData, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to create booking',
        };
    }
};

/**
 * Get user's bookings
 */
export const getMyBookings = async (token, filters = {}) => {
    try {
        const queryParams = new URLSearchParams();

        if (filters.status) queryParams.append('status', filters.status);
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.limit) queryParams.append('limit', filters.limit);
        if (filters.page) queryParams.append('page', filters.page);

        const queryString = queryParams.toString();
        const url = queryString
            ? `${API_URL}/bookings/my?${queryString}`
            : `${API_URL}/bookings/my`;

        const response = await fetch(url, {
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
            message: 'Network error - Unable to fetch bookings',
        };
    }
};

/**
 * Get a single booking by ID
 */
export const getBookingById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
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
            message: 'Network error - Unable to fetch booking',
        };
    }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error - Unable to cancel booking',
        };
    }
};
