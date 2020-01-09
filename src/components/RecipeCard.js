import React, { Component } from 'react';
import './RecipeCard.css'

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        
    }
    

    render() {
        const { recipe } = this.props;

        return (
            <div className="recipe">
                <p>{recipe.name}</p>
                <img src={recipe.img}></img>
            </div>
        );
    }
}

export default RecipeCard;