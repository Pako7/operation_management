import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

import UserService from "../../services/UserService";
import AddUserComponent from './AddUserComponent';
import EditUserComponent from './EditUserComponent';
import ViewUserComponent from './ViewUserComponent';

const UsersComponent = () => {

  const [users, setUsers] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getAll().then(
      response => {
        setUsers(response.data)
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

  const updateUsersList = (user) => {
    setUsers([...users, user]);
  }

  const deleteUser = (id) => {
    UserService.delete(id).then( response => {
      setUsers(users.filter(user => user.id !== id));
    });
  }

  return (
    <div>
      <h2 className="text-center">Users</h2>
      <AddUserComponent updateUsersList={updateUsersList} />
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Name</th>
              <th> Email</th>
              <th> Actions</th>
            </tr>
          </thead>
            <tbody>
              {
                users.map(
                  user =>
                  <tr key={user.id}>
                    <td> { user.name} </td>
                    <td> {user.email}</td>
                    <td>
                    <ViewUserComponent userId={user.id} />
                    <EditUserComponent userId={user.id} />
                    <Button variant="danger" onClick={ () => { deleteUser(user.id) }}> Delete </Button>
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

export default UsersComponent;