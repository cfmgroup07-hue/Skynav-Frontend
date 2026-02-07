import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BookingCard from '../components/BookingCard';
import { getMyBookings, cancelBooking } from '../services/bookingService';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';

function MyBookingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    const token = localStorage.getItem('skynav_token');
    if (!token) return;

    setLoading(true);

    const filters = {};
    if (filter === 'upcoming') filters.type = 'upcoming';
    if (filter === 'past') filters.type = 'past';
    if (filter === 'cancelled') filters.status = 'cancelled';

    const result = await getMyBookings(token, filters);

    if (result.success) {
      setBookings(result.bookings || []);
    }

    setLoading(false);
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    const token = localStorage.getItem('skynav_token');
    const result = await cancelBooking(bookingId, token);

    if (result.success) {
      // Refresh bookings
      fetchBookings();
      alert('Booking cancelled successfully');
    } else {
      alert(result.message || 'Failed to cancel booking');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-primary-50 to-sky-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2 flex items-center gap-3">
            <FaCalendarAlt className="text-primary-600" />
            My Bookings
          </h1>
          <p className="text-primary-700">View and manage your flight bookings</p>
        </div>

        {/* Filter Tabs - Mobile Scrollable */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="bg-white rounded-2xl p-2 border border-primary-100 shadow-lg flex gap-2 w-max min-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition flex-1 text-center ${filter === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-primary-700 hover:bg-primary-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
              <p className="text-lg text-primary-900 font-medium">Loading bookings...</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-primary-100 shadow-lg">
            <FaCalendarAlt className="text-6xl text-primary-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-900 mb-2">
              No bookings found
            </h3>
            <p className="text-primary-600 mb-6">
              {filter === 'upcoming'
                ? 'You have no upcoming flights'
                : filter === 'past'
                  ? 'You have no past bookings'
                  : filter === 'cancelled'
                    ? 'You have no cancelled bookings'
                    : 'Start booking flights to see them here'}
            </p>
            <a
              href="/ibe"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-semibold"
            >
              Search Flights
            </a>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        )}

        {/* Booking Stats */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 border border-primary-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaFilter className="text-primary-600" />
                <span className="text-sm text-primary-700">
                  Showing {bookings.length} booking(s)
                </span>
              </div>

              <div className="text-sm text-primary-600">
                Filter: <span className="font-semibold text-primary-900 capitalize">{filter}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;
