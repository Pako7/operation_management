import React, { useState, useEffect } from "react";
import UsersTeamsFields from "../shared/UsersTeamsFieldsComponent";
import TrackingUserTeamService from "../../services/TrackingUserTeamService";

const TrackingUserTeamsComponent = () => {
  const [trackingUserTeams, setTrackingUserTeams] = useState([]);

  useEffect(() => {
    TrackingUserTeamService.getAll()
      .then(response => {
          setTrackingUserTeams(response.data);
        })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filterTrackingRecords = (e, userId, teamId, startTeamAt, endTeamAt) => {
    e.preventDefault();

    const params = {
      user_id: userId,
      team_id: teamId,
      start_team_at: startTeamAt,
      end_team_at: endTeamAt
    }

    TrackingUserTeamService.getAll(params).then(
      response => {
        setTrackingUserTeams(response.data);
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
    <div>
      <h2 className="text-center">Logs</h2>
      <UsersTeamsFields makeRequest={filterTrackingRecords} action={'Search'} />
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Start at</th>
              <th>End at</th>
              <th>Assigned at</th>
            </tr>
          </thead>
          <tbody>
            {
              trackingUserTeams.map(
                tracking =>
                <tr key={tracking.id}>
                  <td>{tracking.user.name}</td>
                  <td>{tracking.team.name}</td>
                  <td>{tracking.start_team_at}</td>
                  <td>{tracking.end_team_at}</td>
                  <td>{tracking.created_at}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrackingUserTeamsComponent;