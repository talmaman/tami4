import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './sign-up-page.scss';
import axios from 'axios';
import * as utils from '../../utils';

class SignUpPage extends React.Component {

    state = {
        redirect: false,
        username: '',
        email: '',
        password: ''
    };

    componentDidMount() {
        if (utils.getTokenFromStorage()) this.state({redirect: true});
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    redirectToHomePage = () => {
        return <Redirect to='/home' />;
    }

    onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ 
                username: this.state.username, 
                email: this.state.email, 
                password: this.state.password 
            });
            const res = await axios.post('http://localhost:8080/api/auth/signup', body, config);
            utils.setTokenToStorage(res.data.token);
            this.setState({redirect: true});
        } catch (err) {
            console.error(err.response && err.response.data || err);
        }
    };

    

    render() {
        return (
            <Fragment>
                {this.state.redirect && this.redirectToHomePage() ||
                <div className="box sign-up-container">
                    <h1 className="large text-primary">Sign Up</h1>
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
                                value={this.email}
                                type="email"
                                placeholder="Email"
                                name="email"
                            />
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
                        <button className="btn btn-primary">Sign Up</button>
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to="/">Sgin In here</Link>
                </p>
                </div>}
            </Fragment>
        )
    }
}

export default SignUpPage;