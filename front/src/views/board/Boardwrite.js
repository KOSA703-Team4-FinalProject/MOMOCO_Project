import { CAvatar, CBadge, CButton, CCard, CCardBody, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'




const Boardwirte=()=>{
    const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem()
    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem)
    setTagList(updatedTagList)
    setTagItem('')
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
  }


    return (
        <>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                      
                </CCol>
                
              </CRow>
              <div>
              <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-10">
                                    <label>키워드*</label><br></br>
                                    <CFormSelect 
                                    aria-label="키워드를 선택해주센요"
                                    options={[
                                        'Open this select menu',
                                        { label: 'One', value: '1' },
                                        { label: 'Two', value: '2' },
                                        { label: 'Three', value: '3', disabled: true }
                                    ]}
                                    />
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>제목*</label><br></br>
                                    <CFormInput type="text" placeholder="제목을 입력하세요" aria-label="default input example"/>
                                </div>
                               
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>파일*</label><br></br>
                                    <div className="mb-3">
                                        <CFormInput type="file" id="formFile"  />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                   <label>알림*</label> <br></br>&nbsp;
                                    <CFormCheck inline id="inlineCheckbox1" value="option1" label="전체보내기"/> 
                                    <CFormCheck inline id="inlineCheckbox2" value="option2"/><CAvatar className='ms-2' src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/> 메타몽 &nbsp;
                                    <CFormCheck inline id="inlineCheckbox3" value="option3" label="오리" disabled/>
                                </div>
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                            <div calssName="row">
                                <div className="col-md-12">
                                   <label>태그*</label>
                                   <TagBox>
                                    {tagList.map((tagItem, index) => {
                                    return (
                                        <tagItem key={index}>
                                        <Text>{tagItem}</Text>
                                        <Button onClick={deleteTagItem}>X</Button>
                                        </tagItem>
                                    )
                                    })}
                                    <TagInput
                                    type='text'
                                    //placeholder='Press enter to add tags'
                                    tabIndex={2}
                                    onChange={e => setTagItem(e.target.value)}
                                    value={tagItem}
                                    onKeyPress={onKeyPress}
                                    />
                                </TagBox>
                                </div>

                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>글내용*</label><br></br>
                                        <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>This is the initial content of the editor.</p>"
                                        init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        />
                                        <br></br>
                                        <div align="right">
                                        <Link to="/boardlist">
                                          <CButton variant="outline" >글쓰기</CButton>
                                        </Link>
                                        </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </CCardBody>
           
            
          </CCard>
          
        </>
      )
}


const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: tomato;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 6px;
  color: white;
  font-size: 13px;
`
//버튼
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`
const Text = styled.span``



const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`
export default Boardwirte;