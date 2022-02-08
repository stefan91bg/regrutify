import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage.jsx'
import InfoPage from './Pages/InfoPage/InfoPage.jsx'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import AdminPage from './Pages/AdminPage/AdminPage.jsx'
import CreateReportPage from './Pages/CreateReportPage/CreateReportPage.jsx'

export const mainCtx = React.createContext()
export const authCtx = React.createContext()

function App() {

    const [candidatesList, setCandidatesList] = useState([])
    const [reportsList, setReportsList] = useState([])
    const [companiesList, setCompaniesList] = useState([])
    const [refreshReportsList,setRefreshReportsList]=useState(false)

    const [token, setToken] = useState(localStorage.getItem('token'))
    

    useEffect(() => {
        fetch("http://localhost:3333/api/candidates")
            .then(res => res.json())
            .then(res => setCandidatesList(res.map((e, i) => {
                return e
            })))

        fetch("http://localhost:3333/api/reports")
            .then(res => res.json())
            .then(res => setReportsList(res))

        fetch("http://localhost:3333/api/companies")
            .then(res => res.json())
            .then(res => setCompaniesList(res))
    }, [refreshReportsList])

    return (

        <mainCtx.Provider value={{ candidatesList, reportsList, companiesList, setReportsList, refreshReportsList,setRefreshReportsList }}>
            <authCtx.Provider value={{ token, setToken }}>
                {!token && <Switch>
                    <Redirect from='/admin' to='/' />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/info/:id' component={InfoPage} />
                    <Route path='/login' component={LoginPage} />
                </Switch>}
                {token && <Switch>
                    <Redirect from='/login' to='/admin/reports' />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/info/:id' component={InfoPage} />
                    <Route path='/login' component={LoginPage} />
                    <Route exact path='/admin/reports' component={AdminPage} />
                    <Route path='/admin/reports/new-report' component={CreateReportPage} />
                </Switch>}
            </authCtx.Provider>
        </mainCtx.Provider>
    );
}

export default App;