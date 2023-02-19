import React from 'react'
import { CButton, CFormSelect } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../oauth'
import { data } from 'jquery'

const Label = () => {
  const [list, SetList] = useState([])
  const params = useParams()
  // const issueModal = useSelector((state) => state.issueModal)
  // const issueNumber = useSelector((state) => state.issueNumber)
  const myparams = {
    url: params.url,
  }

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const list2 = { label1: 'primary', label2: 'danger' }
  //라벨 목록 호출
  //   useEffect(() => {
  //     axios({
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       url: '/label/list',
  //       data: myparams,
  //     }).then((res) => {
  //       SetList(res.data)
  //     })
  //   }, [])

  return
}

export default Label
