import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import flightSearchReducer from './slices/flightSearchSlice'
import bookingReducer from './slices/bookingSlice'
import visaReducer from './slices/visaSlice'
import adminReducer from './slices/adminSlice'
import paymentReducer from './slices/paymentSlice'
import uiReducer from './slices/uiSlice'
import i18nReducer from './slices/i18nSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    flightSearch: flightSearchReducer,
    booking: bookingReducer,
    visa: visaReducer,
    admin: adminReducer,
    payment: paymentReducer,
    ui: uiReducer,
    i18n: i18nReducer,
  },
})

export default store
