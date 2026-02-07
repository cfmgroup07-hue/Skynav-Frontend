import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  alert: null,
  modal: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setAlert(state, action) {
      state.alert = action.payload
    },
    clearAlert(state) {
      state.alert = null
    },
    setModal(state, action) {
      state.modal = action.payload
    },
    clearModal(state) {
      state.modal = null
    },
  },
})

export const { setLoading, setAlert, clearAlert, setModal, clearModal } = uiSlice.actions
export default uiSlice.reducer
