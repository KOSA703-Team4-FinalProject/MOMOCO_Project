import { configureStore, createSlice } from '@reduxjs/toolkit'

//side bar 상태 
let state = createSlice({
  name: 'sidebarShow',
  initialState: true,
  reducers: {
    changeState(state, { type, ...rest }) {
      switch (type) {
        case 'set':
          return { ...state, ...rest }
        default:
          return state
      }
    },
  },
})

export let { changeName } = state.actions //state 변경함수

//채팅 상태
let chatView = createSlice({
  name: 'chatView',
  initialState: false,
  reducers: {
    changechatView(state){
      return !state
    }
  }
})

export let {changechatView} = chatView.actions

export default configureStore({
  reducer: {
    state: state.reducer,
    chatView: chatView.reducer
  },
})
