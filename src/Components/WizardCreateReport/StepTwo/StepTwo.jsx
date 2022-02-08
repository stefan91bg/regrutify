import React, { useContext, useState } from 'react';
import './step-two.scss'
import { mainCtx } from '../../../App'

function StepTwo(props) {

  const { companiesList } = useContext(mainCtx)
  const [isSelected, setIsSelected] = useState(null)
  const [searchText, setSearchText] = useState("")
  const filteredCompanies = companiesList.filter(e => { return e.name.toLowerCase().includes(searchText.toLowerCase()) }
  )

  return (
    <>
      <div className="searchDiv">
        <input className="search" type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}>
        </input>
      </div>
      <div className="selectcompany">
        <div className="selected-candidate">
          <p>Candidate:</p>
          <h4>{props.report.candidateName}</h4>
        </div>

        <div className='allCompanies'>
          {filteredCompanies.map(e =>
            <div className={e.id === props.report.companyId ? 'singleCompany active' : 'singleCompany'}
              onClick={() => {
                setIsSelected(e.id)
                props.setReport({ ...props.report, companyId: e.id, companyName: e.name })
              }}>
              <p>{e.name}</p>
            </div>)}
        </div>
      </div>
    </>
  );
}

export default StepTwo;