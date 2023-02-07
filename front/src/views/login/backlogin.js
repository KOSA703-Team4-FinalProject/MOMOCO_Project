import axios from 'axios'

export const loginaxios = (res) => {

  console.log(res)
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
  }
  
  console.log(req)

  axios.post('/backlogin/login', req).then((res) => {
    console.log(res)
  })
}
