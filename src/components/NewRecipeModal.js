import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';

// class NewRecipeModal extends Component {
const NewRecipeModal = (props) => {
    const {show, handleClose, handleNewRecipe} = props;
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [fileImg, setFileImg] = useState({
        file: undefined,
        URL: undefined
    });

    const handleFileChange = (event) => {
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

        setFileImg(newFileImg);
    }

    const createRecipe = () => {
        const newRecipe = { name, desc, fileImg };
        handleNewRecipe(newRecipe);
        handleClose();
        setName("");
        setDesc("");
        setFileImg({
            file: undefined,
            URL: undefined
        });
    }

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
                            type="text" placeholder="Enter Recipe Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="desc" value={desc}
                            type="text" placeholder="Enter Recipe Description" onChange={(e) => setDesc(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Col>
                            <Col>
                                <Image src={fileImg.URL} fluid />
                            </Col>

                        </Row>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={createRecipe}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewRecipeModal;