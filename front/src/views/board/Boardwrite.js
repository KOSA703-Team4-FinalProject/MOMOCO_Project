import { CAvatar, CBadge, CButton, CCard, CCardBody, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import React, { Component, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { Link } from "react-router-dom";


import styled from 'styled-components'
import Issue from "./Issue";



  

const Boardwirte=()=>{
 
  const labelselect={
    width:'300px'
  }
 const onKeyUP = (e)=>{
  if(
    (e.keyCode === 51 || e.keyCode === 50) &&
    e.target.value
  )
  console.log("눌러줌눌러줌눌러줌");
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
              <CCol>
              <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>라벨</strong></label><br></br>
                                    <CFormSelect style={labelselect}
                                    aria-label="라벨"
                                    options={[
                                        'Open this select menu',
                                        { label: 'One', value: '1' },
                                        { label: 'Two', value: '2' },
                                        { label: 'Three', value: '3', disabled: true }
                                    ]}
                                    />
                                </div>
                                <div className="col-md-9" align="left">
                                <label><strong>제목</strong></label><br></br>
                                    <CFormInput type="text" placeholder="제목을 입력하세요" aria-label="default input example" onKeyUp={onKeyUP} />
                                </div>
                            </div>
                              <br></br>
                            <div className="row">
                                <div className="col-md-12">
                                    <label><strong>파일</strong></label><br></br>
                                    <div className="mb-3">
                                        <CFormInput type="file" id="formFile"  />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                   <label><strong>알림</strong></label> <br></br>&nbsp;
                                    <CFormCheck inline id="inlineCheckbox1" value="option1" label="전체보내기"/> 
                                    <CFormCheck inline id="inlineCheckbox2" value="option2"/><CAvatar className='ms-2' src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/> 메타몽 &nbsp;
                                    <CFormCheck inline id="inlineCheckbox3" value="option3" label="오리" disabled/>
                                </div>
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                            
                            <br></br>
                            <div className="row">
                                <div className="col-md-12">
                                        <Editor apiKey='7bad8213d57fcb923ce5104810d085c48a73eff3f0d4d98f4fd97051271bdce7' 
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p></p>"
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
                <div><Issue/></div>
              </CCol>
            
           
            </CCardBody>
           
            
          </CCard>
          
        </>
      )
}
export default Boardwirte;