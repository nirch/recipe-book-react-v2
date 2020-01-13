import React, { Component } from 'react';
import './LoginPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import UserModel from '../model/UserModel';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "nir@nir.com",
            pwd: "123",
            showInvalidLoginError: false,
            redirectToRecipesPage: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    login() {
        const { allUsers, handleLogin } = this.props;
        const { email, pwd } = this.state;

        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then(parseUser => {
            // Do stuff after successful login
            const user = new UserModel(parseUser);
            console.log('Logged in user', user);

            // 1) Updating App component on the new active user
            handleLogin(user);

            // 2) navigate to recipes page
            this.setState({
                redirectToRecipesPage: true
            });

        }).catch(error => {
            console.error('Error while logging in user', error);
            this.setState({
                showInvalidLoginError: true
            });
        })
    }

    render() {
        const { email, pwd, showInvalidLoginError, redirectToRecipesPage } = this.state;

        if (redirectToRecipesPage) {
            return <Redirect to="/recipes"/>
        }

        const errorAlert = showInvalidLoginError ? <Alert variant="danger">Invalid email or password!</Alert> : null;

        return (
            <div className="p-login">
                <div className="main">
                    <h1>Login to Recipe Book</h1>
                    <p>or <Link to="/signup">create a new account</Link></p>
                    {errorAlert}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="Enter email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="success" type="button" block onClick={this.login}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;