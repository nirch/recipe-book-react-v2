import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null
      // {
      //   "id": "2121212",
      //   "name": "Nir"
      // }
    }
  }
  

  render() {
    const { activeUser } = this.state;

    return ( 

      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser}/>
        </Route>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/recipes">
          <RecipesPage/>
        </Route>

      </Switch>
    );
  
  }
}

export default App;
