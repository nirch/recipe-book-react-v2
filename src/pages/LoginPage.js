import React, { Component } from 'react';
import './LoginPage.css'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() {
        return (
            <div className="p-login">
                <div className="main">
                    <h1>Login to Recipe Book</h1>
                    <p>or <Link to="/signup">create a new account</Link></p>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="success" type="button" block>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;