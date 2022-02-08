import { Link } from 'react-router-dom'
import { mainCtx } from '../../App'
import React, { useContext, useState } from 'react'

import Header from '../../Components/Header/Header.jsx'
import Card from '../../Components/Card/Card.jsx'
import './home-page.scss'


function HomePage(props) {

  const { candidatesList } = useContext(mainCtx)

  const [searchText, setSearchText] = useState("")

  const filteredCandidates = candidatesList.filter(e => { return e.name.toLowerCase().includes(searchText.toLowerCase()) }
  )

  return (
    <>
      <Header></Header>
      <div className="home-page">
      {localStorage.getItem('token') && (<div className='navigation-buttons'><Link to='/admin/reports'><p>Reports</p></Link>
              <Link to='/admin/reports/new-report'><p>Create Report</p></Link></div>)}
        <div className="search-div">
          
            
          
          <h2>Candidates</h2>
          <input type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}>
          </input>
        </div>
        <div className="cards-wrapper">
          {filteredCandidates.map((e) => <Card candidateInfo={e}></Card>)}</div>
      </div>
    </>
  );
}

export default HomePage;