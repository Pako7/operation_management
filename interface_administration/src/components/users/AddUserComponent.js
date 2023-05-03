import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import UserService from "../../services/user.service";

export default class AddUserComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      showHide : false,
      userName: '',
      userEmail: '',
      userPassword: ''
    }
  }

  createUser(event){
    event.preventDefault();

    const payload = {
      user: {
        name: this.state.userName,
        email: this.state.userEmail,
        password: this.state.userPassword
      }
    }

    UserService.create(payload).then(
      response => {
        this.props.updateList(response.data.user);

        this.setState({ 
          showHide: !this.state.showHide,
          userName: '',
          userEmail: '',
          userPassword: ''
         })
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

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }

  render(){
    return(
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Add user
        </Button>
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={this.createUser.bind(this)}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                   value={this.state.userName}
                   onChange={e => this.setState({ userName: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.userEmail}
                  onChange={e => this.setState({ userEmail: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={this.state.userPassword}
                onChange={e => this.setState({ userPassword: e.target.value })} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>

          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
            Cancel
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
    
}