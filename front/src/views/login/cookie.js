import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setRefreshToken = (refreshToken) => {
  const date = new Date()

  return cookies.set('githubToken', refreshToken, {
    path: '/',
    expires: date.setHours(date.getHours + 8),
    sameSite: 'strict',
  })
}

export const getCookieToken = () => {
  return cookies.get('githubToken')
}

export const removeCookieToken = () => {
  return cookies.remove('githubToken', { sameSite: 'strict', path: '/' })
}
