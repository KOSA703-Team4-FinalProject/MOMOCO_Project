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
import { useDispatch, useSelector } from 'react-redux'
import { updateLabelList } from 'src/store'
import { selectLabel } from 'src/store'

const Label = () => {
  const labelList = useSelector((state) => state.labelList)
  const chooseLabel = useSelector((state) => state.chooseLabel)
  const dispatch = useDispatch()

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

  const myparams = {
    url: params.url,
  }

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
      dispatch(updateLabelList(res.data))
    })
  }, [])

  return (
    <>
      {labelList.map((data, key) => {
        return (
          <>
            <CButton
              onClick={() => {
                dispatch(selectLabel({ label: data.label, style: data.style }))
              }}
              key={data.label}
              color={data.style}
              shape="rounded-pill"
              size="sm"
            >
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
          <AddLabel />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
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
