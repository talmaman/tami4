import React, { Fragment} from 'react';
import { Link, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './candidatePage.scss';
import * as utils from '../../utils';

class CandidatePage extends React.Component {
    state = {
        candidate: {},
        redirect: false
    }
    componentDidMount() {
        const token = utils.getTokenFromStorage();
        if (token) {
            utils.setAuthToken(token);
            axios.get(`http://localhost:8080/api/candidates/${this.props.match.params.id}`)
                .then(response => this.setState({ candidate: response.data.candidate }))
                .catch(e => {
                    utils.clearToken();
                    this.setState({redirect: true});
                });
            return;
        }
        this.setState({redirect: true});
    }

    redirectToSignIn = () => {
        return <Redirect to='/' />;
    }

    render() {
        return (
            <Fragment>
            {this.state.redirect && this.redirectToSignIn()}
            {this.state.candidate && <div className="box candidate-page-container">
                <h1>Candidate #{this.state.candidate.id}</h1>
                <img src={this.state.candidate.avatar} alt="avatar"></img>
                <p>Firstname: {this.state.candidate.first_name}</p>
                <p>Lastname: {this.state.candidate.last_name}</p>
                <p>Gender: {this.state.candidate.gender}</p>
                <p>Job: {this.state.candidate.job_title}</p>
                <p>Description: {this.state.candidate.job_description}</p>
                <Link to={`/home`}>Go Back</Link>
            </div> || this.redirectToSignIn()}
            </Fragment>
        )

    }
};

export default withRouter(CandidatePage);