import React from 'react'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../oauth'
import AddLabel from './AddLabel'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import axios from 'axios'

const Label = () => {
  const [list, SetList] = useState([])
  const [label, SetLabel] = useState('')
  const [style, SetStyle] = useState('')
  const [visible, setVisible] = useState(false)
  const params = useParams()
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  // const issueModal = useSelector((state) => state.issueModal)
  // const issueNumber = useSelector((state) => state.issueNumber)
  const myparams = {
    url: params.url,
  }
  const list2 = [
    { label: '버그', style: 'danger' },
    { label: '스프링', style: 'success' },
    { label: '리액트', style: 'info' },
    { label: '프론트', style: 'light' },
  ]

  //라벨 목록 호출
  useEffect(() => {
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/label/list',
      data: myparams,
    }).then((res) => {
      SetList(res.data)
    })
  }, [])

  return (
    <>
      {list.map((data, key) => {
        return (
          <>
            <CButton key={key} color={data.style} shape="rounded-pill" size="sm">
              {data.label}
            </CButton>{' '}
          </>
        )
      })}
      <BsFillPlusCircleFill size="35px" onClick={() => setVisible(!visible)} />
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <strong>라벨 추가하기</strong>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddLabel props={list} />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false), SetList([])
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Label
