import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import TeamService from "../../services/TeamService";

const EditTeamComponent = ({teamId}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [responsible, setResponsible] = useState('');

  const openFormEditTeam = () => {
    handleModalShowHide();

    TeamService.get(teamId).then(
        response => {
         setName(response.data.team.name)
         setClient(response.data.team.client)
         setResponsible(response.data.team.responsible)
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

  const updateTeam = (e) => {
    e.preventDefault();

    const payload = {
      team: {
        name: name,
        client: client,
        responsible: responsible
      }
    }

    TeamService.update(teamId, payload).then(
      response => {
        handleModalShowHide();
        setName(response.data.team.name);
        setClient(response.data.team.client);
        setResponsible(response.data.team.responsible);
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
      <Button onClick={() => openFormEditTeam()}>
        Edit
      </Button>
      <Modal show={showHideForm}>
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
        <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={e => { updateTeam(e) }}>
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

export default EditTeamComponent;