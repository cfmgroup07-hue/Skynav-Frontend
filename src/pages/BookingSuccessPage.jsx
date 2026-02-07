import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaPlane, FaArrowRight, FaHome } from 'react-icons/fa';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContext';

function BookingSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [saving, setSaving] = useState(true);
    const [error, setError] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        // Extract data from URL (Ypsilon can be configured to pass these)
        const bookingData = {
            airline: queryParams.get('airline') || 'Generic Airline',
            flightNumber: queryParams.get('flightNumber') || queryParams.get('pnr') || 'SK-123',
            from: queryParams.get('from') || 'Unknown',
            to: queryParams.get('to') || 'Unknown',
            departureDate: queryParams.get('departureDate') || new Date().toISOString(),
            arrivalDate: queryParams.get('arrivalDate'),
            price: parseFloat(queryParams.get('price')) || 0,
            currency: queryParams.get('currency') || 'USD',
            passengers: parseInt(queryParams.get('passengers')) || 1,
            pnr: queryParams.get('pnr')
        };

        setBookingDetails(bookingData);

        const saveBooking = async () => {
            const token = localStorage.getItem('skynav_token');
            if (!token) {
                setError('User not authenticated. Please log in to see your booking in the dashboard.');
                setSaving(false);
                return;
            }

            try {
                const result = await createBooking(bookingData, token);
                if (result.success) {
                    console.log('✅ Booking captured and saved to dashboard');
                } else {
                    console.warn('⚠️ Failed to save booking to dashboard:', result.message);
                }
            } catch (err) {
                console.error('❌ Error saving booking capture:', err);
            } finally {
                setSaving(false);
            }
        };

        saveBooking();
    }, [location.search]);

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-primary-100">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-primary-600">Your journey has been successfully booked.</p>
                </div>

                {bookingDetails && (
                    <div className="bg-primary-50 rounded-2xl p-6 mb-8 text-left border border-primary-100">
                        <div className="flex items-center gap-3 mb-4">
                            <FaPlane className="text-primary-600" />
                            <span className="font-bold text-primary-900">{bookingDetails.airline}</span>
                            <span className="text-sm text-primary-500 ml-auto">PNR: {bookingDetails.pnr || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold text-primary-900">
                            <span>{bookingDetails.from}</span>
                            <FaArrowRight className="text-primary-400 text-xs" />
                            <span>{bookingDetails.to}</span>
                        </div>
                        <div className="mt-4 text-sm text-primary-600 flex justify-between">
                            <span>{new Date(bookingDetails.departureDate).toLocaleDateString()}</span>
                            <span className="font-bold text-primary-800">{bookingDetails.currency} {bookingDetails.price}</span>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {saving ? (
                        <p className="text-sm text-primary-500 animate-pulse">Syncing with your dashboard...</p>
                    ) : error ? (
                        <p className="text-sm text-red-600">{error}</p>
                    ) : (
                        <p className="text-sm text-green-600 font-medium font-semibold">✓ Dashboard Updated</p>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to="/my-bookings"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition shadow-lg"
                        >
                            My Bookings
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-bold hover:bg-primary-50 transition"
                        >
                            <FaHome className="text-sm" />
                            Home
                        </Link>
                    </div>

                    <Link
                        to="/profile"
                        className="block text-sm text-primary-500 hover:text-primary-700 font-medium mt-4"
                    >
                        Go to Dashboard →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookingSuccessPage;
