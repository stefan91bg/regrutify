import React from 'react';
import './candidate-info.scss'
import { Link } from 'react-router-dom'
import moment from 'moment';


function CandidateInfo(props) {

    return (
        <div className="candidate-info">
            <Link to={"/"}>
                <div>
                    <button className='back-to-homepage-button'>CANDIDATES</button>
                </div>
            </Link>
            {props.singleCandidate && <div className="about">
                <img src={props.singleCandidate.avatar} alt="avatar" />
                <section>
                <h1>ABOUT</h1>
                <div>
                    <p>Name: {props.singleCandidate.name}</p>
                    <p>E-mail: {props.singleCandidate.email}</p>
                    <p>Date Of Birth: {moment(props.singleCandidate.birthday).format('DD.MM.YYYY.')}</p>
                    <p>Education: {props.singleCandidate.education}</p>
                </div>
                </section>
            </div>}
        </div>
    );
}

export default CandidateInfo;