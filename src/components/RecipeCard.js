import React, { Component } from 'react';
import './RecipeCard.css'
import { Card } from 'react-bootstrap';

class RecipeCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { recipe } = this.props;

        return (
            <div className="recipe">
                <Card>
                    <Card.Img variant="top" src={recipe.img} />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>
                            {recipe.desc}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default RecipeCard;