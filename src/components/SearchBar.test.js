import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  test('calls onSearch with correct filters when form is submitted', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const fromInput = screen.getByLabelText(/from/i)
    const toInput = screen.getByLabelText(/to/i)
    const departDateInput = screen.getByLabelText(/depart date/i)
    const searchButton = screen.getByRole('button', { name: /search flights/i })

    await user.type(fromInput, 'Delhi (DEL)')
    await user.type(toInput, 'London (LHR)')
    fireEvent.change(departDateInput, { target: { value: '2024-03-15' } })
    await user.click(searchButton)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          origin: expect.any(String),
          destination: expect.any(String),
          depart_date: '2024-03-15',
        })
      )
    })
  })
})

