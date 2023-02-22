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
import { BsFillPlusCircleFill, BsXCircleFill } from 'react-icons/bs'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateLabelList } from 'src/store'
import { selectLabel } from 'src/store'
import Swal from 'sweetalert2'

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

  function listLabel() {
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
  }

  //라벨 목록 호출
  useEffect(() => {
    listLabel()
  }, [])

  useEffect(() => {
    SetLabel(chooseLabel.label)
    SetStyle(chooseLabel.style)
  }, [chooseLabel])

  const deleteLabel = () => {
    const data = {
      url: params.url,
      label: label,
    }
    if (chooseLabel == null || label == '') {
      alert('선택한 라벨이 없습니다')
    } else {
      Swal.fire({
        title: '라벨 삭제',
        text: label + ' 라벨을 삭제하시겠습니까?',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          axios({
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            url: '/label/delete',
            data: data,
          }).then((res) => {
            listLabel()
            console.log(res)
            Swal.fire({
              icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
              title: '삭제 되었습니다',
            })
            dispatch(selectLabel([]))
          })
        } else {
          Swal.fire({
            icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '취소되었습니다',
          })
        }
      })
    }
  }

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
      </CModal>{' '}
      <BsXCircleFill size="35px" onClick={() => deleteLabel()} />
    </>
  )
}

export default Label
