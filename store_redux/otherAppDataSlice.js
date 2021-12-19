import { createSlice } from '@reduxjs/toolkit'
import { getDatabase, ref, onValue } from "firebase/database";

const initialState = {
  isClickedOpenAppBtn: false,
  authUser: null,
  userWalletData: null, //[{ id: '', card_number: '', card_balance: '' }],
  currentOrderedTransitData: null,
}

export const otherAppDataSlice = createSlice({
  name: 'otherAppData',
  initialState,
  reducers: {
    setIsClickedOpenAppBtn: (state, action) => {
      state.isClickedOpenAppBtn = action.payload.isClickedOpenAppBtn
    },
    setUserWalletData: (state, action) => {
      state.userWalletData = action.payload
    },
    setCurrentOrderedTransitData: (state, action) => {
      state.currentOrderedTransitData = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setIsClickedOpenAppBtn, setUserWalletData, setCurrentOrderedTransitData} = otherAppDataSlice.actions

export default otherAppDataSlice.reducer