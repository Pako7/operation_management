import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ProfileComponent = ({isAdmin}) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    AuthService.getCurrentUser(assignCurrentUser);
  }, []);

  const assignCurrentUser = (currentUser) => {
    setCurrentUser(currentUser);
    if (!currentUser) {
      <Navigate to={ '/login' } />;
    }
  }

  return (
    <div className="container">
      {currentUser && (
       isAdmin ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong>
            </h3>
          </header>
          <p>
            <strong>Name:</strong>{" "}
            {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Roles:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      ) : (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.name}</strong>
            </h3>
          </header>
          <p>
            <strong>Name:</strong>{" "}
            {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <p>
            <strong>English level:</strong>{" "}
            {currentUser.english_level}
          </p>
          <p>
            <strong>Tech knowledge:</strong>{" "}
            {currentUser.tech_knowledge}
          </p>
          <p>
            <strong>Cv link:</strong>{" "}
            {currentUser.cv_link}
          </p>
        </div>
      )
    )}
    </div>
  );
}

export default ProfileComponent;