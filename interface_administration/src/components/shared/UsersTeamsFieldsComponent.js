import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';

import UserService from "../../services/UserService";
import TeamService from "../../services/TeamService";

const UsersTeamsFieldsComponent = ({makeRequest, action}) => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [startTeamAt, setStartTeamAt] = useState('');
  const [endTeamAt, setEndTeamAt] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getUsers();
    getTeams();
  }, []);

  const getUsers = () => {
    UserService.getAll().then(
      response => {
        setUsers(response.data);
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
  const getTeams = () => {
    TeamService.getAll().then(
      response => {
        setTeams(response.data);
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

  const fillList = (records) => {
    return records.map(record => {
      return (
        <option key={record.id} value={record.id}>
          {record.name}
        </option>
      )
    })
  }

  return (
    <div className="col-md-4">
      <Form onSubmit={e => { makeRequest(e, userId, teamId, startTeamAt, endTeamAt) }}>
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Select
            value={userId}
            onChange={e => setUserId(e.target.value)}
          >
            <option value="">Choose one</option>
            {fillList(users)}
          </Form.Select>

          <Form.Label>Team</Form.Label>
          <Form.Select
            value={teamId}
            onChange={e => setTeamId(e.target.value)}
          >
            <option value="">Choose one</option>
            {fillList(teams)}
          </Form.Select>

          <Form.Label>Start date</Form.Label>
          <Form.Control
            type='date'
            value={startTeamAt}
            onChange={e => setStartTeamAt(e.target.value)}
          />

          <Form.Label>End date</Form.Label>
          <Form.Control
            type='date'
            value={endTeamAt}
            onChange={e => setEndTeamAt(e.target.value)}
          />

        </Form.Group>
        <Button variant="primary" type="submit">
           {action}
        </Button>
      </Form>

    </div>
  );

}    
export default UsersTeamsFieldsComponent;