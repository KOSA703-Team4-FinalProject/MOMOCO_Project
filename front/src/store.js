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

//채팅방 상태
let roomView = createSlice({
  name: 'roomView',
  initialState: false,
  reducers: {
    changeRoomView(state, action){
      state = action.payload
      return state
    }
  }
})

export let { changeRoomView } = roomView.actions

//채팅 상태
let chatView = createSlice({
  name: 'chatView',
  initialState: false,
  reducers: {
    changeChatView(state, action){
      state = action.payload
      return state
    }
  }
})

export let { changeChatView } = chatView.actions

//톡서랍 상태
let talkDrawer = createSlice({
  name: 'talkDrawer',
  initialState: false,
  reducers: {
    changeTalkDrawer(state, action){
      state = action.payload
      return state
    }
  }
})

export let { changeTalkDrawer } = talkDrawer.actions

//톡서랍 세부 상태
let drawerDetailType = createSlice({
  name: 'drawerDetailType',
  initialState: { view : false, type : "" },
  reducers: {
    changeDrawerDetailType(state, action){
      state.type = action.payload[0]
      state.view = action.payload[1]
      return state
    }
  }
})

export let { changeDrawerDetailType } = drawerDetailType.actions

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
    roomView: roomView.reducer,
    chatView: chatView.reducer,
    talkDrawer: talkDrawer.reducer,
    drawerDetailType: drawerDetailType.reducer,
    userProfile: userProfile.reducer,
    member: member.reducer,
    gitToken: gitToken.reducer,
  },
})
