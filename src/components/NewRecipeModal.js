import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';

class NewRecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            desc: "",
            fileImg: {
                file: undefined,
                URL: undefined
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(event) {
        let newFileImg;
        if (event.target.files[0]) {
            newFileImg = {
                file: event.target.files[0],
                URL: URL.createObjectURL(event.target.files[0])
            }
        } else {
            newFileImg = {
                file: undefined,
                URL: undefined
            }
        }


        this.setState({fileImg: newFileImg});        
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
        const { name, desc, fileImg } = this.state;
        const newRecipe = { name, desc, img: fileImg.URL};
        this.props.handleNewRecipe(newRecipe);
        this.props.handleClose();
        this.setState({
            name: "",
            desc: "",
            img: ""
        })
    }

    render() {
        const { show, handleClose } = this.props;
        const { name, desc, fileImg } = this.state;

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
                            <Row>
                                <Col>
                            <Form.Control type="file" onChange={this.handleFileChange} />
                                </Col>
                                <Col>
                                    <Image src={fileImg.URL} fluid/>
                                </Col>

                            </Row>
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