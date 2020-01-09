import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { activeUser, handleLogout } = this.props;

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                    <h1>Recipes Page</h1>
                </Container>
            </div>
        );
    }
}

export default RecipesPage