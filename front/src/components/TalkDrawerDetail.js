import { cilFile, cilFolderOpen, cilImage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CModal, CModalBody } from '@coreui/react'
import { useEffect, useState } from 'react'
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState } from 'src/store'
import $ from 'jquery'
import CryptoJS from 'crypto-js'

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'
import { useParams } from 'react-router'
import axios from 'axios'

const TalkDrawerDetail = (props) => {
  const dispatch = useDispatch()
  const params = useParams()
  let drawerType = useSelector((state) => state.drawerType)
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)
  let [fileList, setFileList] = useState([])
  let [imgSrcList, setImgSrcList] = useState([])
  let [initview, setInitview] = useState(false)
  let [initview2, setInitview2] = useState(false)
  let [ImgModal, setImgModal] = useState(false)
  let [imageURL, setImageURL] = useState('')

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))

  useEffect(() => {
    const reqData = {
      url: params.url,
      r_idx: chatRoomNumber,
      content_type: drawerType,
    }

    axios({
      method: 'GET',
      url: '/api/chat/getFileList',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: reqData,
    }).then((res) => {
      res.data.map((file) => {
        setFileList((fileList) => [...fileList, file])
        if(file.content_type == 'img'){
          loadThumnail(file)
        }
      })
      res.data.length == 0 ? setInitview(false) : setInitview(true)
    })

  }, [])

  //타입이 이미지일 경우 섬네일 가져오기
  function loadThumnail(file){
    const reqData = {
      url: params.url,
      content: 's_'+file.content,
    }

    axios({
      method: 'GET',
      url: '/api/chat/imgView',
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: 'blob',
      params: reqData,
    }).then((res) => {
      const myFile = new File([res.data], 'imageName')
      const reader = new FileReader()
      reader.onload = (ev) => {
        const previewImage = String(ev.target?.result)
        setImgSrcList((imgSrcList) => [...imgSrcList, previewImage]) // myImage라는 state에 저장
      }
      reader.readAsDataURL(myFile)
      setInitview2(true)
    })

  }

  //콘텐츠 클릭할 경우
  const clickContent = (e) => {
    const tag = e.target
    const file_name = $(tag).attr('value')
    
    if(drawerType == 'file'){
      axios({
        method: 'GET',
        url: '/api/token',
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        if (res.data == '') {
          Swal.fire('Error', '잘못된 접근입니다.', 'error')
        } else {
          const url =
            'http://localhost:8090/controller/api/chat/fileDown?url=' +
            params.url +
            '&content=' +
            file_name

          const download = document.createElement('a')

          download.href = url
          download.setAttribute('download', $(tag).html())
          download.setAttribute('type', 'application/json')
          download.click()
        }
      })
    } else if(drawerType == 'img'){
      setImgModal(!ImgModal)
      const reqData = {
        url: params.url,
        content: file_name,
      }

      axios({
        method: 'GET',
        url: '/api/chat/imgView',
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'blob',
        params: reqData,
      }).then((res) => {
        const myFile = new File([res.data], 'imageName')
        const reader = new FileReader()
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result)
          setImageURL(previewImage) // myImage라는 state에 저장
        }
        reader.readAsDataURL(myFile)
      })

    }
  }

  return (
    <div>
      <div className="main2">
        <CCard>
          <div className="row pt-2 ps-2 m-2">
            <h4 className="col">
              <AiOutlineLeftCircle
                className="col"
                size="30"
                onClick={() => {
                  dispatch(changeChatState('chat_drawer'))
                }}
              />{' '}
              <strong className="m-2">
                {drawerType == 'img' ? '사진' : drawerType == 'file' ? '파일' : '링크'} 서랍
              </strong>
            </h4>
          </div>
        </CCard>
        <CCard>
          <div className="row pt-1" align="center">
            {initview == false || initview2 == false ? (
              <div className='p-3'>
                <h4>저장된 파일이 없습니다.</h4>
              </div>
            ) : (
              fileList.map((data, key) => {
                switch (data.content_type) {
                  case 'file':
                    return (
                      <div className="m-3 col-3" key={data.ch_idx} onClick={clickContent} value={data.content}>
                        <CIcon className="ms-2" icon={cilFile} size="4xl" value={data.content} />
                        <h5 className="col ms-2" value={data.content}>
                          <strong value={data.content}>{data.content}</strong>
                        </h5>
                      </div>
                    )
                  case 'img':
                    return (
                      <div className="m-3 col-3" key={data.ch_idx} onClick={clickContent} value={data.content}>
                        <img src={imgSrcList[key]} alt="이미지" />
                        <h5 className="col ms-2" value={data.content}>
                          <strong value={data.content}>{data.content}</strong>
                        </h5>
                      </div>
                    )
                  case 'link':
                    return (
                      <div className="m-3 col-3" key={data.ch_idx} onClick={clickContent} value={data.content}>
                        <BiLinkExternal size="70" value={data.content} />
                        <h5 className="col ms-2" value={data.content}>
                          <strong value={data.content}>{data.content}</strong>
                        </h5>
                      </div>
                    )
                }
              })
            )}
          </div>
        </CCard>
        <CModal alignment="center" visible={ImgModal} onClose={() => setImgModal(false)}>
          <CModalBody>
            <img src={imageURL} alt="이미지" style={{width: '100%', height: 'auto'}} />
          </CModalBody>
        </CModal>
      </div>
    </div>
  )
}

export default TalkDrawerDetail
