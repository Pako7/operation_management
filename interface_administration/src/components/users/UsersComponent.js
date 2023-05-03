import React, { Component } from "react";

import UserService from "../../services/user.service";
import AddUserComponent from './AddUserComponent';
import EditUserComponent from './EditUserComponent';

export default class UsersComponent extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: [],
      content: ''
    };
  }

  componentDidMount() {
    UserService.getAll().then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
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

  deleteUser(id){
    UserService.delete(id).then( response => {
      this.setState({users: this.state.users.filter(user => user.id !== id)});
  });
}

  render() {
    return (
      <div>
        <h2 className="text-center">Users</h2>
        <AddUserComponent users={this.state.users} />
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
                  this.state.users.map(
                    user => 
                    <tr key={user.id}>
                      <td> { user.name} </td>
                      <td> {user.email}</td>
                      <td>
                      <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(user.id)} className="btn btn-info">View</button>
                      <EditUserComponent userId={user.id} />
                      <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>                      
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
}