import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ProfileComponent = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [redirect, setRedirect] = useState('/login');

  useEffect(() => {
    AuthService.getCurrentUser(assignCurrentUser);
  }, []);

  const assignCurrentUser = (currentUser) => {
    if (!currentUser) {
      <Navigate to={redirect} />;
    }
    setCurrentUser(currentUser);
  }

  return (
    <div className="container">
      { currentUser && (
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
    )
    }
    </div>
  );
}

export default ProfileComponent;