import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Cookies } from 'react-cookie';

import { GITHUB_API_SERVER } from '../../oauth'
import { getCookieToken } from './Cookie'

const Profile = () => {
  const [userName, setUserName] = useState()

  useEffect(() => {
    const fetchGithubUser = () => {
      const accessToken = getCookieToken(); //cookie에서 토큰 불러오기

      return fetch(GITHUB_API_SERVER, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })
    }

    fetchGithubUser()
      .then((response) => response.json())
      .then(({ login }) => setUserName(login))
      .catch((err) => console.log(err))
  })

  return <div>로그인 된 사용자 : {userName ?? '로딩중..'}</div>
}

export default Profile
