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

//채팅룸에 대한 보여지는 상태
let chatRoomView = createSlice({
  name: 'chatRoomView',
  initialState: false,
  reducers: {
    changechatRoomView(state){
      return !state
    }
  }
})

export let {changechatRoomView} = chatRoomView.actions

//채팅에 대한 보여지는 상태
let chatView = createSlice({
  name: 'chatView',
  initialState: false,
  reducers: {
    changeChatView(state){
      return !state
    }
  }
})

export let { changeChatView } = chatView.actions

export default configureStore({
  reducer: {
    state: state.reducer,
    chatRoomView: chatRoomView.reducer,
    chatView: chatView.reducer,
  }
})
