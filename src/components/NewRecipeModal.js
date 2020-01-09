import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class NewRecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            desc: "",
            img: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createRecipe() {
        const { name, desc, img } = this.state;
        const newRecipe = { name, desc, img};
        this.props.handleNewRecipe(newRecipe);
        this.props.handleClose();
    }

    render() {
        const { show, handleClose } = this.props;
        const { name, desc, img } = this.state;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={name}
                                type="text" placeholder="Enter Recipe Name" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="desc" value={desc}
                                type="text" placeholder="Enter Recipe Description" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control name="img" value={img}
                                type="text" placeholder="Enter Recipe Image URL" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                </Button>
                    <Button variant="success" onClick={this.createRecipe}>
                        Create
                </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewRecipeModal;