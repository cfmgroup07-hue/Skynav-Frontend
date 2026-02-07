import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardStats from '../components/DashboardStats';
import RecentSearches from '../components/RecentSearches';
import BookingCard from '../components/BookingCard';
import { getSearchHistory, clearSearchHistory } from '../services/searchService';
import { getMyBookings } from '../services/bookingService';
import { FaPlane, FaUser, FaCalendar } from 'react-icons/fa';

function DashboardPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searches, setSearches] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [stats, setStats] = useState({
        totalBookings: 0,
        upcomingFlights: 0,
        searchCount: 0,
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('skynav_token');
        if (!token) return;

        setLoading(true);

        try {
            // Fetch search history
            const searchData = await getSearchHistory(token, 5);
            if (searchData.success) {
                setSearches(searchData.searches || []);
                setStats((prev) => ({ ...prev, searchCount: searchData.total || 0 }));
            }

            // Fetch bookings
            const bookingsData = await getMyBookings(token, { limit: 50 });
            if (bookingsData.success) {
                const bookings = bookingsData.bookings || [];
                const upcoming = bookings.filter(
                    (b) =>
                        b.bookingStatus === 'confirmed' &&
                        new Date(b.departureDate) > new Date()
                );
                setUpcomingBookings(upcoming.slice(0, 3));
                setStats((prev) => ({
                    ...prev,
                    totalBookings: bookings.length,
                    upcomingFlights: upcoming.length,
                }));
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure you want to clear your search history?')) {
            return;
        }

        const token = localStorage.getItem('skynav_token');
        const result = await clearSearchHistory(token);

        if (result.success) {
            setSearches([]);
            setStats((prev) => ({ ...prev, searchCount: 0 }));
        } else {
            alert(result.message || 'Failed to clear history');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-lg text-primary-900 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-primary-50 to-sky-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 border border-primary-100 shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
                                Welcome back, {user?.fullName?.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-sm md:text-base text-primary-700">
                                Manage your bookings and plan your journey.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <FaPlane className="text-6xl text-primary-200" />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
                        <Link
                            to="/ibe"
                            className="flex items-center justify-center md:justify-start gap-3 p-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition shadow-md"
                        >
                            <FaPlane />
                            <span className="font-semibold">Book Flights</span>
                        </Link>
                        <Link
                            to="/my-bookings"
                            className="flex items-center justify-center md:justify-start gap-3 p-4 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition border border-primary-200"
                        >
                            <FaCalendar />
                            <span className="font-semibold">My Bookings</span>
                        </Link>
                        <Link
                            to="/profile"
                            className="flex items-center justify-center md:justify-start gap-3 p-4 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition border border-primary-200"
                        >
                            <FaUser />
                            <span className="font-semibold">Edit Profile</span>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <DashboardStats stats={stats} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Searches */}
                    <div>
                        <RecentSearches
                            searches={searches}
                            onClearHistory={handleClearHistory}
                        />
                    </div>

                    {/* Upcoming Bookings */}
                    <div className="bg-white rounded-2xl p-6 border border-primary-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-primary-900">
                                Upcoming Flights
                            </h3>
                            {upcomingBookings.length > 0 && (
                                <Link
                                    to="/bookings"
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    View All →
                                </Link>
                            )}
                        </div>

                        {upcomingBookings.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-primary-600 mb-4">No upcoming flights</p>
                                <Link
                                    to="/ibe"
                                    className="inline-block px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
                                >
                                    Book a Flight
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingBookings.map((booking) => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
