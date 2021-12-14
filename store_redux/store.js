import { configureStore } from '@reduxjs/toolkit'
import authDataSlice from './authDataSlice'
import otherAppDataSlice from './otherAppDataSlice'
import mapDataSlice from './mapDataSlice'

export const store = configureStore({
  reducer: {
    authData: authDataSlice,
    otherAppData: otherAppDataSlice,
    mapData: mapDataSlice,
  },
})