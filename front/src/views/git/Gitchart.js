import { CAlert, CCallout, CCard, CCardBody, CCardFooter, CCardSubtitle, CCardText, CCardTitle, CCol, CRow } from "@coreui/react"
import { CChart } from "@coreui/react-chartjs";
import WidgetsDropdown from "../widgets/WidgetsDropdown"

const Gitchart = () => {
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
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <br></br>
                    
                    <div className="row">
                    
                        <div className="col-md-6">
                        <CCard className="p-3">
                            <div className="row">
                                <div className="col-md-12" align="center">
                                    <h2><strong>차트1</strong></h2>
                                    <CCallout color="primary">
                                        차트설명
                                    </CCallout>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <CChart
                                    type="line" 
                                    data={{
                                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                                        datasets: [
                                        {
                                            label: "My First dataset",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(220, 220, 220, 1)",
                                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                            pointBorderColor: "#fff",
                                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                                        },
                                        {
                                            label: "My Second dataset",
                                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                                        },
                                        ],
                                    }}
                                    />
                                </div>
                            </div>
                            </CCard>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12" align="center">
                                    <h1>차트2</h1>
                                    <CCallout color="primary">
                                        차트설명
                                    </CCallout>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <CChart
                                    type="bar"
                                    data={{
                                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                        datasets: [
                                        {
                                            label: 'GitHub Commits',
                                            backgroundColor: '#f87979',
                                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                        },
                                        ],
                                    }}
                                    labels="months"
                                 />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12" align="center">
                                    <h1>차트3</h1>
                                    <CCallout color="primary">
                                        차트설명
                                    </CCallout>
                                  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <CChart 
                                    type="radar"
                                    data={{
                                        labels: [
                                        'Eating',
                                        'Drinking',
                                        'Sleeping',
                                        'Designing',
                                        'Coding',
                                        'Cycling',
                                        'Running',
                                        ],
                                        datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                            borderColor: 'rgba(220, 220, 220, 1)',
                                            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                            pointBorderColor: '#fff',
                                            pointHighlightFill: '#fff',
                                            pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                                            data: [65, 59, 90, 81, 56, 55, 40],
                                        },
                                        {
                                            label: 'My Second dataset',
                                            backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                            borderColor: 'rgba(151, 187, 205, 1)',
                                            pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                            pointBorderColor: '#fff',
                                            pointHighlightFill: '#fff',
                                            pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                                            data: [28, 48, 40, 19, 96, 27, 100],
                                        },
                                        ],
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12" align="center">
                                <h1><strong>차트4</strong></h1>
                                <CCallout color="primary">
                                        차트설명
                                    </CCallout>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <CChart
                                    type="doughnut"
                                    data={{
                                        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                                        datasets: [
                                        {
                                            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                            data: [40, 20, 80, 10],
                                        },
                                        ],
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </CCardBody>
        <CCardFooter>

        </CCardFooter>
      </CCard>
    </>
  )
}
export default Gitchart;