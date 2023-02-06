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
  initialState: 'none',   //none, chatroom, chat, chat_drawer, chat_detail 
  reducers: {
    changeChatState(state, action){
      state = action.payload
      return state
    }
  }
})

export let { changeChatState } = chatState.actions

//프로필 상태
let userProfile = createSlice({
  name: 'userProfile',
  initialState: false,
  reducers: {
    changeUserProfile(state, action){
      state = action.payload
      return state
    }
  }
})

export let { changeUserProfile } = userProfile.actions

//accessToken 관리
let gitToken = createSlice({
  name: "gitToken",
  initialState: "",
  reducers: {
    updateGitToken(state, action){
      state = action.payload
      return state
    }
  }
})

export let { updateGitToken } = gitToken.actions

//프로필
let member = createSlice({
  name: 'member',
  initialState: {
    u_idx: 0,         //깃헙 키
    nickname: "",     //닉네임
    leave_date: "",   //탈퇴 시기
    github_url: "",   //깃헙 링크
    profilephoto: "",  //프로필 사진
    company: "",      //소속
    bio: "",          //유저 설명
    email: "",        //이메일
    location: "",     //위치
    blog: ""          //블로그
  },
  reducers: {
    updateMember(state, action){

      return state
    }
  }
})

export let { updateMember } = member.actions

export default configureStore({
  reducer: {
    state: state.reducer,
    chatState: chatState.reducer,
    userProfile: userProfile.reducer,
    member: member.reducer,
    gitToken: gitToken.reducer,
  },
})
