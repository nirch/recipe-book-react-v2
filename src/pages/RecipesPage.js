import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './RecipesPage.css'
import NewRecipeModal from '../components/NewRecipeModal';
import Parse from 'parse'
import RecipeModel from '../model/RecipeModel'
import {Pie} from 'react-chartjs-2';
import emailjs from 'emailjs-com';

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

                // Sending a mail to the user
                var template_params = {
                    "user_email": this.props.activeUser.email,
                    "recipe_name": newRecipe.name,
                    "user_name": this.props.activeUser.fname,
                    "recipe_url": "http://localhost:3000/#/recipes"
                 }
                 
                 var service_id = "default_service";
                 var template_id = "new_recipe";
                 emailjs.send(service_id, template_id, template_params);
        }, error => {
                console.error('Error while creating Recipe: ', error);
        });
    }

    getChartData(recipes) {
        let recipesData = [0, 0];

        recipes.forEach(recipe => {
            if (recipe.difficulty === 1) {
                ++recipesData[0];
            } else if (recipe.difficulty === 2) {
                ++recipesData[1];
            }
        })
        

        return {
            labels: [
                'Easy',
                'Hard',
            ],
            datasets: [{
                data: recipesData,
                backgroundColor: [
                '#FF6384',
                '#36A2EB'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'                ]
            }]
        };

    }

    render() {
        const { showNewRecipeModal, recipes } = this.state;
        const { activeUser, handleLogout } = this.props;

        const chartData = this.getChartData(recipes);

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
                    <Pie data={chartData} />
                </Container>

                <NewRecipeModal show={showNewRecipeModal} handleClose={this.handleClose} handleNewRecipe={this.handleNewRecipe} />

            </div>
        );
    }
}

export default RecipesPage