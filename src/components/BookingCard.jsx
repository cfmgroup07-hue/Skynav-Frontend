import { FaPlane, FaMapMarkerAlt, FaCalendar, FaDollarSign, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

/**
 * Booking Card Component
 * Displays a single booking with details
 */
function BookingCard({ booking, onCancel }) {
    const getStatusBadge = (status) => {
        const badges = {
            confirmed: {
                icon: <FaCheckCircle />,
                text: 'Confirmed',
                bgColor: 'bg-green-100',
                textColor: 'text-green-700',
            },
            cancelled: {
                icon: <FaTimesCircle />,
                text: 'Cancelled',
                bgColor: 'bg-red-100',
                textColor: 'text-red-700',
            },
            completed: {
                icon: <FaClock />,
                text: 'Completed',
                bgColor: 'bg-gray-100',
                textColor: 'text-gray-700',
            },
        };

        const badge = badges[status] || badges.confirmed;

        return (
            <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.bgColor} ${badge.textColor}`}
            >
                {badge.icon}
                {badge.text}
            </span>
        );
    };

    const isUpcoming =
        booking.bookingStatus === 'confirmed' &&
        new Date(booking.departureDate) > new Date();

    return (
        <div className="bg-white border border-primary-200 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex flex-row items-start justify-between mb-4 gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <FaPlane className="text-primary-600 text-lg flex-shrink-0" />
                        <h3 className="text-base md:text-lg font-bold text-primary-900 truncate">
                            {booking.airline}
                        </h3>
                    </div>
                    <p className="text-xs md:text-sm text-primary-600 truncate">
                        Flight {booking.flightNumber}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    {getStatusBadge(booking.bookingStatus)}
                </div>
            </div>

            {/* Route */}
            <div className="flex items-center gap-3 mb-4 p-3 md:p-4 bg-primary-50 rounded-xl overflow-hidden">
                <FaMapMarkerAlt className="text-primary-600 flex-shrink-0" />
                <span className="font-semibold text-primary-900 truncate">{booking.from}</span>
                <span className="text-primary-600 flex-shrink-0">→</span>
                <span className="font-semibold text-primary-900 truncate">{booking.to}</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-primary-700">
                    <FaCalendar className="text-primary-600 flex-shrink-0" />
                    <div>
                        <p className="text-[10px] text-primary-600 leading-tight">Departure</p>
                        <p className="font-semibold text-xs md:text-sm">
                            {format(new Date(booking.departureDate), 'MMM dd, yyyy')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-primary-700">
                    <FaDollarSign className="text-primary-600 flex-shrink-0" />
                    <div>
                        <p className="text-[10px] text-primary-600 leading-tight">Price</p>
                        <p className="font-semibold text-xs md:text-sm">
                            {booking.currency} {booking.price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Passengers */}
            <div className="text-xs md:text-sm text-primary-700 mb-4">
                <span className="font-bold">{booking.passengers}</span> passenger(s)
            </div>

            {/* Booked Date */}
            <div className="text-[10px] text-primary-600 border-t border-primary-100 pt-3">
                Booked on {format(new Date(booking.bookedAt), 'MMM dd, yyyy h:mm a')}
            </div>

            {/* Cancel Button */}
            {isUpcoming && onCancel && (
                <button
                    onClick={() => onCancel(booking._id)}
                    className="w-full mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-xl font-bold text-sm hover:bg-red-100 transition shadow-sm"
                >
                    Cancel Booking
                </button>
            )}
        </div>
    );
}

export default BookingCard;
