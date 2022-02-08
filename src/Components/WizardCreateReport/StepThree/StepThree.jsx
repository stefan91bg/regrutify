import React from 'react';
import './step-three.scss'


function StepThree(props) {

   const todayDate = () => {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()
      if (dd < 10) {
         dd = '0' + dd
      }
      if (mm < 10) {
         mm = '0' + mm
      }
      return `${yyyy}-${mm}-${dd}`
   }


   return (
      <>
      <div className="wrapper">
        <div className="selectedcandidate-company">
      <p>Candidate:</p>
      <h4>{props.report.candidateName}</h4>
      <p>Company:</p>
      <h4>{props.report.companyName}</h4>
      </div>
      <div className="set-informations">
         <div className="label-input">
            <label htmlFor="date">Interview Date: </label>
            <input type="date" id="date" name="interview-date"
               value={props.report.interviewDate}
               onChange={e => props.setReport({ ...props.report, interviewDate: e.target.value })}
               min="2020-01-01" max={todayDate()} required>
            </input>
         </div>
         <div className="label-input">
            <label htmlFor="phase">Phase: </label>
            <select id="phase" name="phase" value={props.report.phase}
               onChange={e => props.setReport({ ...props.report, phase: e.target.value })} required>
               <option value=''>Please select phase</option>
               <option value="cv">CV</option>
               <option value="hr">HR</option>
               <option value="tech">TECHNICAL</option>
               <option value="final">FINAL</option>
            </select>
         </div>
         <div className="label-input">
            <label htmlFor="status">Status: </label>
            <select id="status" name="status" value={props.report.status}
               onChange={e => props.setReport({ ...props.report, status: e.target.value })} required>
               <option value=''>Please select status</option>
               <option value="passed">PASSED</option>
               <option value="declined">DECLINED</option>
            </select>
         </div>
         <div className="label-input">
            <label htmlFor="notes">Notes: </label>
            <textarea name="message" rows="10" cols="100" placeholder=" Write a Note..." value={props.report.note}
               onChange={e => props.setReport({ ...props.report, note: e.target.value })} required >
            </textarea>
         </div>
      </div>
      </div>
      </>
   );
}

export default StepThree;