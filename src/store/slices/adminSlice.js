import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  payments: [],
  reports: {},
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminUsers(state, action) {
      state.users = action.payload
    },
    setAdminPayments(state, action) {
      state.payments = action.payload
    },
    setAdminReports(state, action) {
      state.reports = action.payload
    },
  },
})

export const { setAdminUsers, setAdminPayments, setAdminReports } = adminSlice.actions
export default adminSlice.reducer
