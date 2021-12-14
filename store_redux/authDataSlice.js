import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  isAuth: null
}

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.name = action.payload.name
    },

    setIsAuth: (state, action) => {
      state.isAuth = action.payload.isAuth
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPhone, setIsAuth } = authDataSlice.actions

export default authDataSlice.reducer