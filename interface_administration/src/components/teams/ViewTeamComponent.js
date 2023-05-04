import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import TeamService from "../../services/TeamService";

const ViewUserComponent = ({teamId}) => {

  const [showHideForm, setShowHideForm] = useState(false);
  const [content, setContent] = useState('');
  const [team, setTeam] = useState({});

  const openViewUser = () => {
    handleModalShowHide();

    TeamService.get(teamId).then(
      response => {
        setTeam(response.data.team);
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
        <Modal.Title>Team: {team.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            <Form.Label>Client: </Form.Label> 
              <Form.Label>{team.client}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Responsible: </Form.Label>
              <Form.Label>{team.responsible}</Form.Label>
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