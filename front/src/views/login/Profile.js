import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { GITHUB_API_SERVER, PRIMARY_KEY } from '../../oauth'
import { loginaxios } from './backlogin'
import { useNavigate } from 'react-router'
import CryptoJS from 'crypto-js'
import { Cookies } from 'react-cookie'
import { useSelector } from 'react-redux'

const Profile = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()

  useEffect(() => {
    const fetchGithubUser = () => {
      // AES알고리즘 사용 복호화
      const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
      //인코딩, 문자열로 변환, JSON 변환
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

      const accessToken = decrypted.token
      console.log(accessToken)

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
        const data = {
          u_idx: response.data.id,
          nickname: response.data.login,
        }

        const workname = localStorage.getItem('workName')

        //cookie저장
        cookies.remove('u_idx', { sameSite: 'strict', path: '/' })

        const date = new Date()
        cookies.set('u_idx', response.data.id, {
          path: '/',
          expires: date.setHours(date.getHours + 8),
          sameSite: 'strict',
        })

        localStorage.setItem('login', JSON.stringify(data)) //로컬 스토리지에 저장

        //백서버에 회원 정보 전달
        if (workname == '' || workname == null) {
          loginaxios(response.data, 'admin', '')
        } else {
          loginaxios(response.data, 'user', workname)
        }
      })
      .then(() => {
        navigate('/workSpaceList')
      })
      .catch((err) => console.log(err))
  })

  return <div></div>
}

export default Profile
