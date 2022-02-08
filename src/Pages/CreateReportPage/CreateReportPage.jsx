import React, { useState, useContext } from 'react'
import './create-report-page.scss'
import Header from '../../Components/Header/Header.jsx'
import StepOne from '../../Components/WizardCreateReport/StepOne/StepOne.jsx'
import StepTwo from '../../Components/WizardCreateReport/StepTwo/StepTwo.jsx'
import StepThree from '../../Components/WizardCreateReport/StepThree/StepThree.jsx'
import { Link, useHistory } from 'react-router-dom'
import { mainCtx } from '../../App'
import { authCtx } from '../../App'

function CreateReportPage() {

    const history = useHistory()
    const { reportsList, setReportsList } = useContext(mainCtx)
    const { token } = useContext(authCtx)
    const [wizardStep, setWizardStep] = useState(1)
    const [report, setReport] = useState({
        candidateId: '',
        candidateName: '',
        companyId: '',
        companyName: '',
        interviewDate: '',
        phase: '',
        status: '',
        note: ''
    })
    const redirect = () => {
        history.push('/admin/reports')
    }

    const sumbitReport = () => {
        fetch("http://localhost:3333/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(res => {
                setReportsList([...reportsList, res])
                redirect()
            })
    }

    return (
        <div>
            <Header></Header>
            <div className='nav2-buttons'>
                <Link to='/admin/reports'><button>REPORTS</button></Link>
                <Link to='/admin/reports/new-report'><button>CREATE NEW REPORTS</button></Link>
            </div>
            {wizardStep === 1 && <StepOne report={report} setReport={setReport}></StepOne>}
            {wizardStep === 2 && <StepTwo report={report} setReport={setReport}></StepTwo>}
            {wizardStep === 3 && <StepThree report={report} setReport={setReport} ></StepThree>}
            <div className="navigation-buttons">
                {(wizardStep === 2 || wizardStep === 3) &&
                    <button className='back'
                        onClick={() => {
                            ((wizardStep === 2 && setReport({ ...report, companyName: '', companyId: '' })) ||
                                (wizardStep === 3 && setReport({ ...report, interviewDate: '', phase: '', status: '', note: '' }))
                            )
                            setWizardStep(wizardStep - 1)
                        }}>BACK</button>}
                {(wizardStep === 1 || wizardStep === 2) &&
                    <button className='next'
                        onClick={() => {
                            ((wizardStep === 1 && report.candidateName !== '') && setWizardStep(wizardStep + 1)) || ((wizardStep === 2 && report.companyName !== '') && setWizardStep(wizardStep + 1))
                        }}>
                        NEXT
                    </button>}
                {wizardStep === 3 && <button className='submit'
                    onClick={() => {
                        (report.interviewDate !== '' && report.phase !== '' && report.status !== '' && report.note !== '') && sumbitReport()
                    }
                    }>SUBMIT</button>}
            </div>
        </div >
    );
}

export default CreateReportPage;