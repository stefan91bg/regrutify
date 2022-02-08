import React, { useContext, useEffect, useState } from 'react'
import './info-page.scss'
import Header from '../../Components/Header/Header.jsx'
import CandidateInfo from '../../Components/CandidateInfo/CandidateInfo.jsx'
import { mainCtx } from '../../App'
import Modal from '../../Components/Modal/Modal'
import moment from 'moment'

function InfoPage(props) {

  const { candidatesList, reportsList } = useContext(mainCtx)
  const [candidateId, setCandidateId] = useState([])
  const [modalReportId, setModalReportId] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setCandidateId(props.match.params.id);
  }, [candidatesList])

  const singleCandidate = candidatesList?.find((e) => e.id === parseInt(candidateId))
  const filteredReports = reportsList?.filter((e) => e.candidateId === parseInt(candidateId))
  const modalReport = reportsList?.find((e) => e.id === parseInt(modalReportId))

  return (
    <div>
      <Header></Header>
      <div className="info-page">
        <CandidateInfo singleCandidate={singleCandidate}></CandidateInfo>
        <div>
          <h1>REPORTS</h1>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Interview Date</th>
                <th>Status</th>
              </tr>
            </thead>
            {filteredReports.map((e) => {
              return < thead >
                <tr>
                  <td>{e.companyName}</td>
                  <td>{moment(e.interviewDate).format('DD.MM.YYYY.')}</td>
                  <td className='status'>{e.status} <button className='modalButton' onClick={() => {
                    setModalReportId(e.id)
                    setIsModalOpen(true)
                  }}>i</button></td>
                </tr>
              </thead>
            })}
          </table>
          <Modal modalReport={modalReport} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></Modal>
        </div >
      </div>
    </div>
  );
}

export default InfoPage;