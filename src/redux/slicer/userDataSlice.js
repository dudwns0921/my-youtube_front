import { createSlice } from '@reduxjs/toolkit'
import { getUserFromCookie } from '../../utils/cookie'

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: getUserFromCookie() ? JSON.parse(getUserFromCookie()) : {},
  },
  reducers: {
    insert: (state, action) => {
      state.value = action.payload
    },
    remove: (state) => {
      state.value = {}
    },
  },
})

export const { insert, remove } = userDataSlice.actions

export default userDataSlice.reducer
