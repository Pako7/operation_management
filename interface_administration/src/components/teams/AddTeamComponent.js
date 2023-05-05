import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import TeamService from "../../services/TeamService";

const AddTeamComponent = ({updateTeamList}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [responsible, setResponsible] = useState('');

  const createTeam = (e) => {
    e.preventDefault();

    const payload = {
      team: {
        name: name,
        client: client,
        responsible: responsible
      }
    }

    TeamService.create(payload).then(
      response => {
        updateTeamList(response.data.team);

        handleModalShowHide();
        setName('');
        setClient('');
        setResponsible('');
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
        Add team
      </Button>
      <Modal show={showHideForm}>
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
        <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={e => { createTeam(e) }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Control
                value={client}
                onChange={e => setClient(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Responsible</Form.Label>
              <Form.Control
              value={responsible}
              onChange={e => setResponsible(e.target.value)} />
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


export default AddTeamComponent;