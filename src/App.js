import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsonUsers from "./data/users";
import jsonRecipes from "./data/recipes"
import RecipeNavbar from './components/RecipeNavbar';



class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null,
      allUsers: jsonUsers,
      allRecipes: jsonRecipes
      // allRecipes: jsonRecipes.map(recipe => new RecipeModel(recipe));
      // {
      //   "id": "2121212",
      //   "name": "Nir"
      // }

      //null
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);
  }
  
  handleLogin(user) {
    this.setState({
      activeUser: user
    });
  }

  handleLogout() {
    this.setState({
      activeUser: null
    })
  }

  handleNewRecipe(newRecipe) {
    console.log(newRecipe);
  }


  render() {
    const { activeUser, allUsers, allRecipes } = this.state;

    const activeUserRecipes = activeUser ? 
      allRecipes.filter(recipe => recipe.userId === activeUser.id) : null

    return ( 

      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
        <Route exact path="/login">
          <LoginPage allUsers={allUsers} handleLogin={this.handleLogin}/>
        </Route>
        <Route exact path="/recipes">
          <RecipesPage activeUser={activeUser} recipes={activeUserRecipes} handleLogout={this.handleLogout} 
            handleNewRecipe={this.handleNewRecipe}/>
        </Route>

      </Switch>
    );
  
  }
}

export default App;
