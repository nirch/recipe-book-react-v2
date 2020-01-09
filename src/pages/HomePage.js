import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends Component {
    render() {
        return (
            <div>
                <RecipeNavbar/>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default HomePage;