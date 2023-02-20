import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

import { CLIENT_ID, CLIENT_SECRETS, GITHUB_AUTH_TOKEN_SERVER, PRIMARY_KEY } from '../../oauth'


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
        //로컬스토리지에 access toeken 저장
        window.localStorage.removeItem('token');
        const mydata = {
          token: data.data.access_token
        }
        // AES알고리즘 사용 암호화
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(mydata), PRIMARY_KEY).toString();
        window.localStorage.setItem('token', encrypted)

        navigate('/profile')
      })
      .catch((err) => console.log(err))
  })

  return <div>로딩중 ...</div>
}

export default Callback
