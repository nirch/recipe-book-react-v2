import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { activeUser, handleLogout, recipes } = this.props;

        if (!activeUser) {
            return <Redirect to="/"/>
        }

        const recipesView = recipes.map(recipe => 
            <Col lg={3} md={6}>
                <RecipeCard recipe={recipe}/>
            </Col>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Container>
                <h1>{activeUser.fname}'s Recipes</h1>
                <Row>
                    {recipesView}
                </Row>
                
                </Container>
            </div>
        );
    }
}

export default RecipesPage