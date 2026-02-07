import { FaMapMarkerAlt, FaCalendar, FaUsers, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

/**
 * Recent Searches Component
 * Displays user's recent flight searches
 */
function RecentSearches({ searches, onClearHistory }) {
    if (!searches || searches.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-primary-100">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Recent Searches
                </h3>
                <p className="text-primary-600 text-center py-8">
                    No recent searches found. Start searching for flights!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary-900">
                    Recent Searches
                </h3>
                {searches.length > 0 && (
                    <button
                        onClick={onClearHistory}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition"
                    >
                        <FaTrash />
                        Clear History
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {searches.map((search) => (
                    <div
                        key={search._id}
                        className="flex items-center justify-between p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary-600" />
                                <span className="font-semibold text-primary-900">
                                    {search.from}
                                </span>
                                <span className="text-primary-600">→</span>
                                <span className="font-semibold text-primary-900">
                                    {search.to}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-primary-700">
                                <div className="flex items-center gap-1">
                                    <FaCalendar />
                                    <span>
                                        {format(new Date(search.departureDate), 'MMM dd, yyyy')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaUsers />
                                    <span>{search.passengers} passenger(s)</span>
                                </div>
                            </div>
                        </div>

                        <span className="text-xs text-primary-600">
                            {format(new Date(search.searchedAt), 'MMM dd, h:mm a')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentSearches;
