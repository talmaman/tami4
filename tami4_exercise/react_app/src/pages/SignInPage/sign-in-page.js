import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './sign-in-page.scss';
import axios from 'axios';
import * as utils from '../../utils';

class SignInPage extends React.Component {

    state = {
        redirect: false,
        username: '',
        password: ''
    };

    componentDidMount() {
        if (utils.getTokenFromStorage()) this.setState({redirect: true});

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ username: this.state.username, password: this.state.password });
            const res = await axios.post('http://localhost:8080/api/auth/signin', body, config);
            utils.setTokenToStorage(res.data.token);
            this.setState({redirect: true});
        } catch (err) {
            this.setState({error: err.response && err.response.data.message})
        }
    };

    redirectToHomePage = () => {
        return <Redirect to='/home' />;
    }

    render() {
        return (
            <Fragment>
                {this.state.redirect && this.redirectToHomePage() ||
                <div className="box sign-in-container">
                    <h1 className="large text-primary">Sign In</h1>
                   <span><strong>{this.state.error}</strong></span> 
                    <form className="form" onSubmit={e => this.onSubmit(e)}>
                        <div className="form-group">
                            <input required
                                onChange={e => this.onChange(e)}
                                value={this.username}
                                type="text"
                                placeholder="Username"
                                name="username" />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={e => this.onChange(e)}
                                value={this.password}
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </div>
                        <button className="btn btn-primary">Sign In</button>
                    </form>
                    <p className="my-1">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
                </div>}
            </Fragment>
        )
    }
}

export default SignInPage;