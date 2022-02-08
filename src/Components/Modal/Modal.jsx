import React from 'react';
import './modal.scss'
import moment from 'moment';


function Modal(props) {

  if (!props.isModalOpen) {
    return null
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className="close-modal" onClick={() => props.setIsModalOpen(false)}>X</button>
        <h2>{props.modalReport.candidateName}</h2>
        <div className="info-note">
          <div className="info">
            <p>Company</p>
            <h3>{props.modalReport.companyName}</h3>
            <p>Interview date</p>
            <h3>{moment(props.modalReport.interviewDate).format('DD.MM.YYYY.')}</h3>
            <p>Interview phase</p>
            <h3>{props.modalReport.phase.toUpperCase()}</h3>
            <p>Status</p>
            <h3>{props.modalReport.status.toUpperCase()}</h3>
          </div>
          <div className="note">
            <p>Notes</p>
            <h4>{props.modalReport.note}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;