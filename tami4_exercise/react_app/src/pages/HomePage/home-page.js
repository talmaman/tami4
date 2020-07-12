import React, { Component, Fragment } from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import * as utils from '../../utils';
import Candidate from '../../components/candidate';
import './home-page.scss';

class HomePage extends Component {
    state = {
        candidates: [],
        redirect: false
    };

    componentDidMount() {
        this.getCandidates();
    };

    redirectToSignIn = () => {
        return <Redirect to='/' />;
    }

    getCandidates = () => {
        const token = localStorage.getItem('token');
        if (token)
            utils.setAuthToken(token);
        axios.get(`http://localhost:8080/api/candidates`)
        .then(res => {
          this.setState({candidates: res.data.candidates});
        })
        .catch(e => {
            utils.clearToken();
            this.setState({redirect: true});
        });
    };

    render(){
        return(
            <Fragment>
            {this.state.redirect && this.redirectToSignIn() ||
            <div className="container">
                <div className="box container-inner-box">
                <h1>Candidates</h1>
                     {this.state.candidates.map((candidate,index) => <Candidate data={candidate} index={++index} key={candidate.id}/>)}
                </div>    
            </div>}
            </Fragment>
        )
    };


};

export default HomePage;