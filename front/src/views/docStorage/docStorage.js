import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'
import { CForm, CFormTextarea } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WriteDocStorage from './WriteDocStorage'
import UpdateDocStorage from './UpdateDocStorage'
import Comments from '../../components/Comments'
import { Editor } from '@tinymce/tinymce-react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import {
  BsCardImage,
  BsFillFileEarmarkImageFill,
  BsFillFolderFill,
  BsFillFolderSymlinkFill,
  BsFolderMinus,
  BsLink,
} from 'react-icons/bs'

// AES알고리즘 사용 복호화
const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
//인코딩, 문자열로 변환, JSON 변환
const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
const accessToken = decrypted.token

const docStorage = (props) => {
  const [visibleXL, setVisibleXL] = useState(false)

  const [list, SetList] = useState([])
  let [ImgModal, setImgModal] = useState(false)
  const [file, SetFile] = useState('')
  const [link, SetLink] = useState('')
  let [imageURL, setImageURL] = useState('')
  const [preview, setPreview] = useState('')

  //워크스페이스 주소값
  const dispatch = useDispatch()
  const params = useParams()
  const url = params.url

  const myparams = {
    url: params.url,
  }

  const deleteDoc = (idx) => {
    const data = {
      url: url,
      idx: idx,
    }
    Swal.fire({
      title: '문서저장소 삭제',
      text: idx + '번 글을 삭제하시겠습니까?',
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
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          url: '/doc/delete',
          data: data,
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '삭제 되었습니다',
          })
          listDoc()
        })
      } else {
        Swal.fire({
          icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: '취소되었습니다',
        })
      }
    })
  }

  function listDoc() {
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/doc/list',
      data: myparams,
    }).then((res) => {
      SetList(res.data)
    })
  }

  //문서저장소 게시판 리스트 호출
  useEffect(() => {
    listDoc()
  }, [])

  //모달창 꺼질 때마다 리스트 호출
  useEffect(() => {
    listDoc()
  }, [visibleXL])

  const filesubmit = (e) => {
    e.preventDefault()
    const type = e.target.type.value
    const file = e.target.save.value
    const link = e.target.link.value

    if (type == 'file') {
      axios({
        method: 'GET',
        url: '/api/token',
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        if (res.data == '') {
          Swal.fire('Error', '잘못된 접근입니다.', 'error')
        } else {
          const url =
            'http://localhost:8090/controller/doc/fileDown?url=' + params.url + '&content=' + file

          const link = document.createElement('a')
          link.href = url
          link.download = file

          // 링크 클릭
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
    } else if (type == 'image') {
      setImgModal(!ImgModal)
      const reqData = {
        url: params.url,
        content: file,
      }
      axios({
        method: 'POST',
        url: '/doc/viewImage',
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'blob',
        params: reqData,
      }).then((res) => {
        const myFile = new File([res.data], 'imageName')
        const reader = new FileReader()
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result)
          setImageURL(previewImage) // myImage라는 state에 저장
          const imgTag = (
            <CModalBody>
              <img src={previewImage} style={{ width: '100%', height: 'auto' }} alt="Preview" />
            </CModalBody>
          )
          setPreview(imgTag)
        }
        reader.readAsDataURL(myFile)
      })
    } else if (type == 'link') {
      window.open(link)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-3">
                문서저장소
              </h4>
            </CCol>
            <CCol sm={7} align="end" className="d-none d-md-block">
              <CButton
                type="submit"
                variant="outline"
                onClick={() => {
                  setVisibleXL(!visibleXL)
                }}
              >
                등록
              </CButton>
              <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                <CModalHeader>
                  <CModalTitle>문서저장소 등록</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <WriteDocStorage />
                </CModalBody>
              </CModal>
            </CCol>
          </CRow>
          <CAccordion alwaysOpen activeItemKey={parseInt(params.idx)}>
            {list.map((data, key) => (
              <CAccordionItem itemKey={parseInt(data.idx)} key={key}>
                <CAccordionHeader>
                  <CRow className="col-12">
                    <CCol className="col-2 px-2">
                      <strong>
                        <CIcon icon={cilCheck} /> #{data.idx}{' '}
                        <CButton color={data.style} shape="rounded-pill" size="sm">
                          {data.label}
                        </CButton>
                      </strong>
                    </CCol>
                    <CCol className="col-4 px-2">
                      <strong>{data.title}</strong>
                    </CCol>
                    <CCol className="col-4 px-2">
                      {data.upload_type == 'link' ? (
                        <BsLink />
                      ) : data.upload_type == 'file' ? (
                        <BsFillFolderFill />
                      ) : (
                        <BsCardImage />
                      )}
                      {data.ori_filename.length > 25 ? (
                        <strong> {data.ori_filename.substr(0, 25) + '...'}</strong>
                      ) : (
                        <strong> {data.ori_filename}</strong>
                      )}
                    </CCol>
                    <CCol className="col-2 px-1">
                      <strong>{data.nickname}</strong>
                      <p></p>
                      <strong>{data.w_date}</strong>
                    </CCol>
                  </CRow>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCol align="center">
                    <CForm onSubmit={filesubmit}>
                      <h3>
                        <CFormInput type="hidden" name="link" value={data.ori_filename} />
                        <CFormInput type="hidden" name="save" value={data.save_filename} />
                        <CFormInput type="hidden" name="type" value={data.upload_type} />
                        {data.upload_type == 'link' ? (
                          <BsLink />
                        ) : data.upload_type == 'file' ? (
                          <BsFillFolderFill />
                        ) : (
                          <BsCardImage />
                        )}
                        <strong> {data.ori_filename.substr(0, 24)} </strong>
                        <CButton
                          type="submit"
                          className="my-3 mx-1"
                          color="dark"
                          variant="outline"
                          value={data.upload_type}
                        >
                          {data.upload_type === 'image' ? (
                            <>
                              <strong>미리보기</strong>
                              <CModal
                                alignment="center"
                                visible={ImgModal}
                                onClose={() => setImgModal(false)}
                              >
                                {preview}
                              </CModal>
                            </>
                          ) : data.upload_type === 'link' ? (
                            <strong>바로가기</strong>
                          ) : (
                            <>
                              <strong>파일저장</strong>
                            </>
                          )}
                        </CButton>
                      </h3>
                    </CForm>
                  </CCol>
                  <Editor
                    value={data.content}
                    name="tinyEditor"
                    apiKey="avqk22ebgv68f2q9uzprdbapxmxjwdbke8xixhbo24x2iyvp"
                    init={{
                      height: 300,
                      selector: 'div.tinymce',
                      plugins: ['quickbars'],
                      toolbar: false,
                      menubar: false,
                      inline: false,
                    }}
                  />
                  <CRow>
                    <CCol align="end">
                      <UpdateDocStorage doc={data} />

                      <CButton
                        onClick={() => {
                          deleteDoc(data.idx)
                        }}
                        className="my-3 mx-1"
                        color="danger"
                        variant="outline"
                      >
                        삭제
                      </CButton>
                    </CCol>
                  </CRow>
                  <CRow>
                    <Comments idx={data.idx} />
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default docStorage
