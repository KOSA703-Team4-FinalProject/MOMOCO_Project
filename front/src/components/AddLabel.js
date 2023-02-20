import React from 'react'
import { CForm, CButton, CFormInput, CFormSelect } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../oauth'
import { data } from 'jquery'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateLabelList } from 'src/store'

const AddLabel = (props) => {
  const dispatch = useDispatch()
  const labelList = useSelector((state) => state.labelList)

  const [visible, setVisible] = useState(false)
  const [label, SetLabel] = useState('')
  const [style, SetStyle] = useState('')
  const [checkname, SetCheckname] = useState('')
  const params = useParams()
  const login = JSON.parse(localStorage.getItem('login'))
  const nickname = login.nickname
  const u_idx = login.u_idx
  const url = params.url

  const LabelHandler = (e) => {
    e.preventDefault()
    SetCheckname('true')
    labelList.map((data) => {
      if (e.target.value === data.label) {
        return alert('이미 동일한 이름의 라벨이 있습니다'), SetCheckname('false')
      }
    })
    SetLabel(e.target.value)
  }

  const StyleHandler = (e) => {
    e.preventDefault()
    SetStyle(e.target.value)
  }

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const AddLabelHandler = () => {
    const add = {
      label: label,
      style: style,
      url: url,
    }
    const additem = {
      label: label,
      style: style,
    }
    if (checkname === 'true' && style != '') {
      axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: '/label/add',
        data: add,
      }).then((res) => {
        if (res.data == '1') {
          alert('라벨이 추가되었습니다')
          dispatch(updateLabelList([...labelList, additem]))
        } else {
          alert('라벨 등록 실패')
        }
      })
    } else {
      alert('라벨 이름이 중복되었거나 색상이 선택되지 않았습니다')
    }
  }

  return (
    <>
      <CForm>
        <h6>
          <strong>라벨의 이름을 입력하세요.</strong>
        </h6>
        <CFormInput
          onChange={LabelHandler}
          type="text"
          name="label"
          placeholder="ex) 버그, DB, 리액트, 스프링, 검토..."
          value={label}
        />
        <hr></hr>
        <h6>
          <strong>색상을 선택하세요.</strong>
        </h6>
        <CButton onClick={StyleHandler} value="primary" color="primary" shape="rounded-pill">
          보라
        </CButton>
        <CButton onClick={StyleHandler} value="secondary" color="secondary" shape="rounded-pill">
          회색
        </CButton>
        <CButton onClick={StyleHandler} value="success" color="success" shape="rounded-pill">
          녹색
        </CButton>
        <CButton onClick={StyleHandler} value="danger" color="danger" shape="rounded-pill">
          빨강
        </CButton>
        <CButton onClick={StyleHandler} value="warning" color="warning" shape="rounded-pill">
          노랑
        </CButton>
        <CButton onClick={StyleHandler} value="info" color="info" shape="rounded-pill">
          하늘
        </CButton>
        <CButton onClick={StyleHandler} value="light" color="light" shape="rounded-pill">
          은색
        </CButton>
        <CButton onClick={StyleHandler} value="dark" color="dark" shape="rounded-pill">
          다크
        </CButton>
        <p></p>
        <hr></hr>
        <h6>
          <strong>미리보기</strong>
        </h6>
        <CButton color={style} shape="rounded-pill" size="sg">
          {label}
        </CButton>

        <div align="right">
          <CButton onClick={AddLabelHandler}>추가</CButton>
        </div>
      </CForm>
    </>
  )
}

export default AddLabel
