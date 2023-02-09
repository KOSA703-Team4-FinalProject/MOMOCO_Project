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

//채팅 상태 관리
let chatState = createSlice({
  name: 'chatState',
  initialState: 'none', //none, chatroom, chat, chat_drawer, chat_detail
  reducers: {
    changeChatState(state, action) {
      state = action.payload
      return state
    },
  },
})

export let { changeChatState } = chatState.actions

//프로필 상태
let userProfile = createSlice({
  name: 'userProfile',
  initialState: false,
  reducers: {
    changeUserProfile(state, action) {
      state = action.payload
      return state
    },
  },
})

export let { changeUserProfile } = userProfile.actions

//accessToken 관리
let gitToken = createSlice({
  name: 'gitToken',
  initialState: '',
  reducers: {
    updateGitToken(state, action) {
      state = action.payload
      return state
    },
  },
})

export let { updateGitToken } = gitToken.actions

//이슈번호 상태값
let issueModal = createSlice({
  name: 'issueModal',
  initialState: false,
  reducers: {
    updateIssueModal(state, action) {
      state = action.payload

      return state
    },
  },
})

export let { updateIssueModal } = issueModal.actions

// 이슈번호 클릭값 받아오기
let issueNumber = createSlice({
  name: 'issueNumber',
  initialState: '',
  reducers: {
    updateissueNumber(state, action) {
      state = action.payload

      return state
    },
  },
})

export let { updateissueNumber } = issueNumber.actions

export default configureStore({
  reducer: {
    state: state.reducer,
    chatState: chatState.reducer,
    userProfile: userProfile.reducer,
    gitToken: gitToken.reducer,
    issueModal: issueModal.reducer,
  },
})
