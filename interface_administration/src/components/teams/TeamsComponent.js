import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

import TeamService from "../../services/TeamService";
import AddTeamComponent from './AddTeamComponent';
import EditTeamComponent from './EditTeamComponent';
import ViewTeamComponent from './ViewTeamComponent';

const TeamsComponent = () => {

  const [teams, setTeams] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    TeamService.getAll().then(
      response => {
        setTeams(response.data)
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
  }, [])

  const updateTeamList = (team) => {
    setTeams([...teams, team]);
  }

  const deleteTeam = (id) => {
    TeamService.delete(id).then( response => {
      setTeams(teams.filter(team => team.id !== id));
    });
  }

  return (
    <div>
      <h2 className="text-center">Teams</h2>
      <AddTeamComponent updateTeamList={updateTeamList} />
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Responsible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              teams.map(
                team =>
                <tr key={team.id}>
                  <td> {team.name} </td>
                  <td> {team.client}</td>
                  <td> {team.responsible}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <ViewTeamComponent teamId={team.id} />
                      <EditTeamComponent teamId={team.id} />
                      <Button variant="danger" onClick={ () => { deleteTeam(team.id) }}> Delete </Button>
                      </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamsComponent;