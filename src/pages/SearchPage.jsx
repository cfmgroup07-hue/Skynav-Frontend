import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

function SearchPage() {
  const navigate = useNavigate()

  const handleSearch = (filters) => {
    navigate('/results', { state: { filters } })
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Search Flights</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  )
}

export default SearchPage

