import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './RecipesPage.css'
import NewRecipeModal from '../components/NewRecipeModal';
import Parse from 'parse'
import RecipeModel from '../model/RecipeModel'

class RecipesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            showNewRecipeModal: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleNewRecipe = this.handleNewRecipe.bind(this);
    }

    async componentDidMount() {
        if (this.props.activeUser) {
            const Recipe = Parse.Object.extend('Recipe');
            const query = new Parse.Query(Recipe);
            query.equalTo("userId", Parse.User.current());
            
            const parseRecipes = await query.find();
            const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
            this.setState({ recipes });
            // query.find().then((parseRecipes) => {
            //     const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
            //     this.setState({ recipes });
            // }, (error) => {
            //     console.error('Error while fetching Recipe', error);
            // });
        }
    }

    handleClose() {
        this.setState({
            showNewRecipeModal: false
        })
    }

    handleNewRecipe(newRecipe) {
        const Recipe = Parse.Object.extend('Recipe');
        const newParseRecipe = new Recipe();

        newParseRecipe.set('name', newRecipe.name);
        newParseRecipe.set('desc', newRecipe.desc);
        newParseRecipe.set('image', new Parse.File(newRecipe.fileImg.file.name, newRecipe.fileImg.file));
        newParseRecipe.set('userId', Parse.User.current());

        newParseRecipe.save().then(theCreatedParseRecipe => {
                console.log('Recipe created', theCreatedParseRecipe);
                this.setState({
                    recipes: this.state.recipes.concat(new RecipeModel(theCreatedParseRecipe))
                })
        }, error => {
                console.error('Error while creating Recipe: ', error);
        });
    }

    render() {
        const { showNewRecipeModal, recipes } = this.state;
        const { activeUser, handleLogout } = this.props;

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
                        <Button onClick={() => { this.setState({ showNewRecipeModal: true }) }}>New Recipe</Button>
                    </div>
                    <Row>
                        {recipesView}
                    </Row>

                </Container>

                <NewRecipeModal show={showNewRecipeModal} handleClose={this.handleClose} handleNewRecipe={this.handleNewRecipe} />

            </div>
        );
    }
}

export default RecipesPage