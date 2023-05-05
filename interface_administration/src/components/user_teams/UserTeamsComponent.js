import React from "react";
import UserService from "../../services/UserService";
import UsersTeamsFields from "../shared/UsersTeamsFieldsComponent";

const UsersTeamsComponent = () => {
  const linkUserTeam = (e, userId, teamId, startTeamAt, endTeamAt) => {
    e.preventDefault();

    const payload = {
      user: {
        team_id: teamId,
        start_team_at: startTeamAt,
        end_team_at: endTeamAt
      }
    }

    UserService.update(userId, payload).then(
      response => {
 
      },
      error => {
        /*
        setContent({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        */
      }
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Users Teams</h1>
        <hr />
      </header>
      <UsersTeamsFields makeRequest={linkUserTeam} action={'Assign'} />
    </div>
  );

}    
export default UsersTeamsComponent;