import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FlightCard from '../FlightCard'

const mockFlight = {
  id: 'flight-001',
  price: 45000,
  currency: 'INR',
  refundable: true,
  score: 8.5,
  airlines: ['Air India'],
  segments: [
    {
      from: 'DEL',
      to: 'LHR',
      dep_time: '2024-03-15T02:30:00Z',
      arr_time: '2024-03-15T08:45:00Z',
      duration_min: 375,
    },
  ],
  duration_total_min: 375,
  stops: 0,
  transfers: [],
  seats_left: 5,
}

describe('FlightCard', () => {
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  test('renders flight price and airline', () => {
    render(<FlightCard flight={mockFlight} onSelect={mockOnSelect} />)

    expect(screen.getByText(/₹45,000/)).toBeInTheDocument()
    expect(screen.getByText('Air India')).toBeInTheDocument()
  })

  test('calls onSelect with flight id when Book button is clicked', async () => {
    const user = userEvent.setup()
    render(<FlightCard flight={mockFlight} onSelect={mockOnSelect} />)

    const bookButton = screen.getByRole('button', { name: /book now/i })
    await user.click(bookButton)

    expect(mockOnSelect).toHaveBeenCalledWith('flight-001')
  })
})

