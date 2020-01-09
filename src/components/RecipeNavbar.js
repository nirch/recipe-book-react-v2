import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'

class RecipeNavbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { activeUser } = this.props;

        const recipesLink = activeUser ? <Nav.Link href="#/recipes">Recipes</Nav.Link> : null;
        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link>Logout</Nav.Link> : null;


        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/">Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {recipesLink}
                    </Nav>
                    <Nav className="ml-auto">
                        {signupLink}
                        {loginLink}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default RecipeNavbar;