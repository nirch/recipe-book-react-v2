import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class NewRecipeModal extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const { show, handleClose } = this.props;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewRecipeModal;