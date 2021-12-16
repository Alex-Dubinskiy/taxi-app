import { createSlice } from '@reduxjs/toolkit'
import { getDatabase, ref, onValue } from "firebase/database";

const initialState = {
  isClickedOpenAppBtn: false,
  authUser: null,
  userWalletData: null
}

export const otherAppDataSlice = createSlice({
  name: 'otherAppData',
  initialState,
  reducers: {
    setIsClickedOpenAppBtn: (state, action) => {
      state.isClickedOpenAppBtn = action.payload.isClickedOpenAppBtn
    },
    setUserWalletData: (state, action) => {
      state.userWalletData = action.payload.userWalletData
    }
  }
})

// Action creators are generated for each case reducer function
export const { setIsClickedOpenAppBtn, setUserWalletData } = otherAppDataSlice.actions

export default otherAppDataSlice.reducer