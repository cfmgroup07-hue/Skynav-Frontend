import { FaPlane, FaHistory, FaCalendarCheck } from 'react-icons/fa';

/**
 * Dashboard Statistics Component
 * Displays key metrics in card format
 */
function DashboardStats({ stats }) {
    const statsData = [
        {
            icon: <FaPlane className="text-3xl text-primary-600" />,
            label: 'Total Bookings',
            value: stats?.totalBookings || 0,
            bgColor: 'bg-primary-50',
        },
        {
            icon: <FaCalendarCheck className="text-3xl text-green-600" />,
            label: 'Upcoming Flights',
            value: stats?.upcomingFlights || 0,
            bgColor: 'bg-green-50',
        },
        {
            icon: <FaHistory className="text-3xl text-sky-600" />,
            label: 'Recent Searches',
            value: stats?.searchCount || 0,
            bgColor: 'bg-sky-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {statsData.map((stat, index) => (
                <div
                    key={index}
                    className={`${stat.bgColor} rounded-2xl p-5 md:p-6 border border-primary-100 hover:shadow-lg transition-shadow`}
                >
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs md:text-sm font-medium text-primary-700 mb-1">
                                {stat.label}
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-primary-900">
                                {stat.value}
                            </p>
                        </div>
                        <div className={`p-3 md:p-4 rounded-xl ${stat.bgColor} flex-shrink-0`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;
