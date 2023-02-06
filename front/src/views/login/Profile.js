import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { GITHUB_API_SERVER } from '../../oauth'
import { getCookieToken } from './cookie'
import { loginaxios } from './backlogin'


const Profile = () => {
  const [userName, setUserName] = useState()

  useEffect(() => {
    const fetchGithubUser = () => {
      const accessToken = getCookieToken(); //cookie에서 토큰 불러오기

      return axios(GITHUB_API_SERVER, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })
    }

    fetchGithubUser()
      .then((response) => {
        loginaxios(response.data) //백서버에 회원 정보 전달
        setUserName(response.data.login)
      })
      .catch((err) => console.log(err))
  })

  return <div>로그인 된 사용자 : {userName ?? '로딩중..'}</div>
}

export default Profile
