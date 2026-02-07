import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: {},
  results: [],
}

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload
    },
    setSearchResults(state, action) {
      state.results = action.payload
    },
  },
})

export const { setSearchQuery, setSearchResults } = flightSearchSlice.actions
export default flightSearchSlice.reducer
