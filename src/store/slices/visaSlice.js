import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  countries: [],
  applications: [],
}

const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {
    setVisaCountries(state, action) {
      state.countries = action.payload
    },
    setVisaApplications(state, action) {
      state.applications = action.payload
    },
  },
})

export const { setVisaCountries, setVisaApplications } = visaSlice.actions
export default visaSlice.reducer
