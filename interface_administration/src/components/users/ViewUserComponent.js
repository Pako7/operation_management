import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import UserService from "../../services/UserService";

const ViewUserComponent = ({userId}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [user, setUser] = useState({});

  const openViewUser = () => {
    handleModalShowHide();

    UserService.get(userId).then(
      response => {
        setUser(response.data.user);
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
      <Button onClick={e => { openViewUser() }}>
        View
      </Button>
      <Modal show={showHideForm}>
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
        <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <div>
                <Form.Label>{user.email}</Form.Label>
              </div>
              <Form.Label>Roles:</Form.Label>
              <ul>
                {user.roles &&
                  user.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalShowHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewUserComponent;