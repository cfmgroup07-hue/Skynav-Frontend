import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactions: [],
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayments(state, action) {
      state.transactions = action.payload
    },
  },
})

export const { setPayments } = paymentSlice.actions
export default paymentSlice.reducer
