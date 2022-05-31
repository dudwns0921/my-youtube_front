import { configureStore } from '@reduxjs/toolkit'
import isLoginReducer from './slicer/isLoginSlice'
import userDataReducer from './slicer/userDataSlice'

export default configureStore({
  reducer: {
    isLogin: isLoginReducer,
    userData: userDataReducer,
  },
})
