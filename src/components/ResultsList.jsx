import FlightCard from './FlightCard'

function ResultsList({ results, total, page = 1, totalPages = 1, perPage = 6, onPageChange, onSelect }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && onPageChange) {
      onPageChange(newPage)
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages with ellipsis
      if (page <= 3) {
        // Show first 3 pages, ellipsis, and last page
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (page >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1)
        pages.push('ellipsis')
        pages.push(page - 1)
        pages.push(page)
        pages.push(page + 1)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <section
      role="region"
      aria-label="Flight search results"
      className="space-y-4"
    >
      <header className="mb-4">
        <p className="text-lg font-semibold text-neutral-900">
          Found offers: {total}
        </p>
      </header>

      <div className="space-y-6">
        {results.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-10 text-center">
            <p className="text-lg font-semibold text-neutral-600">
              No flights found matching your criteria.
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Try adjusting the route, dates, or filters to see more options.
            </p>
          </div>
        ) : (
          results.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={onSelect}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav 
          className="mt-6 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              page === 1
                ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === 'ellipsis') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-neutral-500">
                    ...
                  </span>
                )
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`min-w-[40px] px-3 py-2 rounded-lg border transition-colors ${
                    page === pageNum
                      ? 'bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white border-transparent'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
                  }`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={page === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              page === totalPages
                ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

export default ResultsList