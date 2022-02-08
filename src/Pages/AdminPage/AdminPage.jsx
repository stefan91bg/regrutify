import React, { useContext, useState } from 'react'
import './admin-page.scss'
import Header from '../../Components/Header/Header.jsx'
import Modal from '../../Components/Modal/Modal'
import moment from 'moment'
import { mainCtx } from "../../App"
import { Link } from 'react-router-dom'
import { authCtx } from '../../App'

function ReportsPage(props) {
  const { reportsList,refreshReportsList,setRefreshReportsList } = useContext(mainCtx)
  const { token } = useContext(authCtx)


  const [searchText, setSearchText] = useState("")
  const [modalReportId, setModalReportId] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredReports = reportsList.filter(e => { return e.candidateName.toLowerCase().includes(searchText.toLowerCase()) || e.companyName.toLowerCase().includes(searchText.toLowerCase()) }
  )

  const modalReport = reportsList?.find((e) => e.id === parseInt(modalReportId))

  const deleteReport = (parametar) => {
    fetch(`http://localhost:3333/api/reports/${parametar}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => console.log(res))
  }


  return (
    <div>
      <Header></Header>
      <div className='underHeader'>
        <div className="buttons"><Link to='/admin/reports'><button>REPORTS</button></Link>
          <Link to='/admin/reports/new-report'><button>CREATE NEW REPORTS</button></Link>
        </div>
        <div className='searchDiv'>
          <input className="search"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}>
          </input>
        </div>
      </div>
      <div className='all-reports'>
        {filteredReports.map((e) => {
          return <div className="report">
            <div>
              <h3>{e.companyName}</h3>
              <p>Company</p>
            </div>
            <div>
              <h3>{e.candidateName}</h3>
              <p>Candidate</p>
            </div>
            <div>
              <h3>{moment(e.interviewDate).format('DD.MM.YYYY.')}</h3>
              <p>Interview Date</p>
            </div>
            <div>
              <h3>{e.status}</h3>
              <p>Status</p>
            </div>
            <div className='action-btn'>
              <button onClick={() => {
                setModalReportId(e.id)
                setIsModalOpen(true)
              }}>i</button>
              <button onClick={() => {
                setRefreshReportsList(!refreshReportsList)
                deleteReport(e.id)
              }}>X</button>
            </div>
          </div>
        }
        )}
      </div>
      <Modal modalReport={modalReport} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></Modal>
    </div>
  );
}

export default ReportsPage;