import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GITHUB_API_SERVER } from '../../oauth'

const Profile = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  let gitToken = useSelector((state) => state.gitToken)

  useEffect(() => {
    const fetchGithubUser = () => {
      const accessToken = location.state

      return fetch(GITHUB_API_SERVER, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${gitToken}`,
          Accept: 'application/json',
        },
      })
    }

    fetchGithubUser()
      .then((response) => response.json())
      .then(({ login }) => dispatch(  ) )
      .catch((err) => console.log(err))
  })

  return <div>로그인 된 사용자 : {userName ?? '로딩중..'}</div>
}

export default Profile
