// Airport coordinates database
export const airportCoordinates = {
  'DEL': { lat: 28.5562, lon: 77.1000, name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
  'BOM': { lat: 19.0896, lon: 72.8656, name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  'BLR': { lat: 13.1986, lon: 77.7066, name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  'CCU': { lat: 22.6547, lon: 88.4467, name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
  'MAA': { lat: 12.9944, lon: 80.1806, name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  'HYD': { lat: 17.2403, lon: 78.4294, name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  'LHR': { lat: 51.4700, lon: -0.4543, name: 'London Heathrow Airport', city: 'London', country: 'UK' },
  'JFK': { lat: 40.6413, lon: -73.7781, name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  'DXB': { lat: 25.2532, lon: 55.3657, name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  'SIN': { lat: 1.3644, lon: 103.9915, name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  'AUH': { lat: 24.4330, lon: 54.6511, name: 'Abu Dhabi International Airport', city: 'Abu Dhabi', country: 'UAE' },
  'MCT': { lat: 23.5933, lon: 58.2844, name: 'Muscat International Airport', city: 'Muscat', country: 'Oman' },
  'AMS': { lat: 52.3105, lon: 4.7683, name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  'CDG': { lat: 49.0097, lon: 2.5479, name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  'FRA': { lat: 50.0379, lon: 8.5622, name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  'IST': { lat: 41.2622, lon: 28.7278, name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  'DOH': { lat: 25.2611, lon: 51.5651, name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
  'ICN': { lat: 37.4602, lon: 126.4407, name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  'BKK': { lat: 13.6811, lon: 100.7475, name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  'KUL': { lat: 2.7456, lon: 101.7099, name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
}

export function getAirportCoordinates(code) {
  return airportCoordinates[code] || { lat: 0, lon: 0, name: code, city: code, country: 'Unknown' }
}





