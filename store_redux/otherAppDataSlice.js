import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isClickedOpenAppBtn: false,
  authUser: null
}

export const otherAppDataSlice = createSlice({
  name: 'otherAppData',
  initialState,
  reducers: {
    setIsClickedOpenAppBtn: (state, action) => {
      state.isClickedOpenAppBtn = action.payload.isClickedOpenAppBtn
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsClickedOpenAppBtn } = otherAppDataSlice.actions

export default otherAppDataSlice.reducer