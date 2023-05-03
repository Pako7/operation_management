import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import UserService from "../../services/UserService";

const AddUserComponent = ({updateUsersList}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = (e) => {
    e.preventDefault();

    const payload = {
      user: {
        name: name,
        email: email,
        password: password
      }
    }

    UserService.create(payload).then(
      response => {
        updateUsersList(response.data.user);

        handleModalShowHide();
        setName('');
        setEmail('');
        setPassword('');
      },
      error => {
        setContent({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  const handleModalShowHide = () => {
    setShowHideForm(!showHideForm)
  }

  return(
    <div>
      <Button variant="primary" onClick={() => handleModalShowHide()}>
        Add user
      </Button>
      <Modal show={showHideForm}>
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
        <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={e => { createUser(e) }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => handleModalShowHide()}>
          Cancel
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default AddUserComponent;