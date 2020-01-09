import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './RecipesPage.css'

class RecipesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            showNewRecipeModal: false
        })
    }

    render() {
        const { showNewRecipeModal } = this.state;
        const { activeUser, handleLogout, recipes } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const recipesView = recipes.map(recipe =>
            <Col lg={3} md={6}>
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

                <Modal show={showNewRecipeModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default RecipesPage