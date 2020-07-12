import React from 'react';
import './candidate.scss';
import { Link } from 'react-router-dom';

const Candidate = ({data, index}) => {

const {first_name, last_name ,email ,id, avatar} = data;
    return(
    <>
        <div className="box candidate">
        <img src={avatar} alt="avatar"></img>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <p>{email}</p> 
            <Link to={`/candidate/${id}`}>Show Candidate</Link>
        </div>
    </>
    )
};

export default Candidate;
