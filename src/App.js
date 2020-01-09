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

      //null
    }

    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    this.setState({
      activeUser: null
    })
  }

  render() {
    const { activeUser } = this.state;

    return ( 

      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/recipes">
          <RecipesPage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>

      </Switch>
    );
  
  }
}

export default App;
