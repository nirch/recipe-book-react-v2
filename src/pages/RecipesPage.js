import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './RecipesPage.css'
import NewRecipeModal from '../components/NewRecipeModal';

class RecipesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleNewRecipe = this.handleNewRecipe.bind(this);
    }

    handleClose() {
        this.setState({
            showNewRecipeModal: false
        })
    }

    handleNewRecipe(newRecipe) {
        this.props.handleNewRecipe(newRecipe);
    }

    render() {
        const { showNewRecipeModal } = this.state;
        const { activeUser, handleLogout, recipes } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const recipesView = recipes.map(recipe =>
            <Col lg={3} md={6} key={recipe.id}>
                <RecipeCard recipe={recipe} />
            </Col>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    <div className="recipes-header">
                        <h1>{activeUser.fname}'s Recipes</h1>
                        <Button onClick={() => {this.setState({showNewRecipeModal: true})}}>New Recipe</Button>
                    </div>
                    <Row>
                        {recipesView}
                    </Row>

                </Container>

                <NewRecipeModal show={showNewRecipeModal} handleClose={this.handleClose} handleNewRecipe={this.handleNewRecipe}/>

            </div>
        );
    }
}

export default RecipesPage