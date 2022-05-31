import { createSlice } from '@reduxjs/toolkit'
import { getTokenFromCookie } from '../../utils/cookie'

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState: {
    value: getTokenFromCookie() ? true : false,
  },
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      state.value = false
    },
  },
})

export const { login, logout } = isLoginSlice.actions

export default isLoginSlice.reducer
