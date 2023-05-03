import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/AuthService";

import Home from "./components/HomeComponent";
import Login from "./components/LoginComponent";
import Profile from "./components/ProfileComponent";
import Teams from "./components/teams/TeamsComponent";
import Users from "./components/users/UsersComponent";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    AuthService.getCurrentUser(assignCurrentUser);
  }, [])

  const assignCurrentUser = (currentUser) => {
    setCurrentUser(currentUser);
    setShowUsers(currentUser.roles.includes('super_admin') || currentUser.roles.includes('admin'));
  }

  const logOut = () => {
    AuthService.logout();
    setShowUsers(false);
    setCurrentUser(undefined);
  }

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Administración de operación
          </Link>
          <div className="navbar-nav mr-auto">
            {showUsers && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/teams"} className="nav-link">
                  Teams
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut ({currentUser.email})
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    )
}

export default App;