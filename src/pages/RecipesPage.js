import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { activeUser, handleLogout } = this.props;

        if (!activeUser) {
            return <Redirect to="/"/>
        }

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                <h1>{activeUser.fname}'s Recipes</h1>
                </Container>
            </div>
        );
    }
}

export default RecipesPage