import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        const { activeUser } = this.props;

        return (
            <div>
                <RecipeNavbar activeUser={activeUser}/>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default HomePage;