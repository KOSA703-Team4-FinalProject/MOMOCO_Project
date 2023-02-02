const styles ={
  root:{
    width:'20px',
    margin:'auto',
    marginTop :16,
    textAlign:'left',
    backgroundColor:"#ffff",
    borderRadius:16,
  },
  commentContainer:{
    display:'inline-block',
    marginLeft:16,
    textAlign:'left',
    verticalAlign:'top',
  },
  contentText:{
    color:'black',
    fontSize:16,
  }
}
const comments =[
  {name :'Ha**', text:'안녕하세요'},
  {name:'ZKk**',text:'하하이하이'},
  {name: 'bo**',text:'말해'},
]

const comment = () => {
    return (
      <>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  댓글
                </h4>
              </CCol>
              <CCol sm={7} className="d-none d-md-block">
  
              </CCol>
            </CRow>
              
          </CCardBody>
          <CCardFooter> 
  
          </CCardFooter>
        </CCard>
      </>
    )
    };
    export default comment;