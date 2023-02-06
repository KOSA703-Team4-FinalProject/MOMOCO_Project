import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CLIENT_ID, CLIENT_SECRETS, GITHUB_AUTH_TOKEN_SERVER } from '../../oauth'
import { setRefreshToken } from './cookie'


const Callback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const axiosAccessToken = async () => {
      // 쿼리스트링에서 Authorization Code를 가져옵니다.
      const location = new URL(window.location.href)
      const code = location.searchParams.get('code')
      const ACCESS_TOKEN_URL = `${GITHUB_AUTH_TOKEN_SERVER}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRETS}&code=${code}`

      return axios({
        url: ACCESS_TOKEN_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    }

    axiosAccessToken()
      .then((data) => {
        //쿠키에 access token 저장
        setRefreshToken(data.data.access_token)
        navigate('/profile', { state: data.data.access_token })
      })
      .catch((err) => console.log(err))
  })

  return <div>로딩중 ...</div>
}

export default Callback
