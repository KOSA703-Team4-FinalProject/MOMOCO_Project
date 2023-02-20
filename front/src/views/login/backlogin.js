import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const loginaxios = (res, myrole, workspaceName) => {

  const req = {
    u_idx: res.id,
    nickname: res.login,
    github_url: res.html_url,
    profilephoto: res.avatar_url,
    company: res.company === null ? '' : res.company,
    bio: res.bio === null ? '' : res.bio,
    email: res.email === null ? '' : res.email,
    location: res.location === null ? '' : res.location,
    blog: res.blog === null ? '' : res.blog,
    role: myrole,
    workspace: workspaceName,
  }

  axios.post('/backlogin/login', req).then((res) => {
    console.log(res)
  })
}
