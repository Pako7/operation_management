import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import UserService from "../../services/UserService";

const EditUserComponent = ({userId}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const openFormEditUser = () => {
    handleModalShowHide();

    UserService.get(userId).then(
        response => {
          setName(response.data.user.name);
          setEmail(response.data.user.email);
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

  const updateUser = (e) => {
    e.preventDefault();

    const payload = {
      user: {
        name: name,
        email: email
      }
    }

    UserService.update(userId, payload).then(
      response => {
        handleModalShowHide();
        setName('');
        setEmail('');
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
      <Button onClick={() => openFormEditUser()}>
        Edit
      </Button>
      <Modal show={showHideForm}>
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
        <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={e => { updateUser(e) }}>
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

export default EditUserComponent;