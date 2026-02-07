import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FiltersSidebar from '../FiltersSidebar'

describe('FiltersSidebar', () => {
  const mockOnChange = jest.fn()
  const availableFacets = {
    priceMin: 0,
    priceMax: 100000,
    durationMax: 1440,
    airlines: ['Air India', 'British Airways', 'Emirates'],
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  test('calls onChange when price filter is changed', async () => {
    render(
      <FiltersSidebar
        availableFacets={availableFacets}
        onChange={mockOnChange}
      />
    )

    const priceSlider = screen.getByLabelText(/minimum price/i)
    fireEvent.change(priceSlider, { target: { value: '50000' } })

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled()
    }, { timeout: 500 })
  })

  test('calls onChange when airline checkbox is toggled', async () => {
    render(
      <FiltersSidebar
        availableFacets={availableFacets}
        onChange={mockOnChange}
      />
    )

    const airlineCheckbox = screen.getByText('Air India').closest('label').querySelector('input')
    fireEvent.click(airlineCheckbox)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          airlines: expect.arrayContaining(['Air India']),
        })
      )
    }, { timeout: 500 })
  })
})

