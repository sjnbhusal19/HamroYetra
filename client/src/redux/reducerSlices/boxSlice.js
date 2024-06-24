import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  backgroundColor: 'red', 
    width: 50,
    height: 50,
    borderRadius: '0%'
}

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeHeight(state) {
      state.height=state.height+2
    },

    changeWidth(state) {
      state.width=state.width+2
    },

    changeShape(state) {
      state.borderRadius='50%'
    },
  },
})

export const { changeHeight,changeWidth, changeShape } = boxSlice.actions
export default boxSlice.reducer