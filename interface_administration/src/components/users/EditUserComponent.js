import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

import UserService from "../../services/user.service";

export default class EditUserComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      showHide : false,
      name: '',
      email: ''
    }
    this.openFormEditUser = this.openFormEditUser.bind(this);
  };

  openFormEditUser() {
    this.setState({ showHide: !this.state.showHide });

    UserService.get(this.props.userId).then(
        response => {
          this.setState({
            user: response.data.user
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

  updateUser(event){
    event.preventDefault();

    const payload = {
      user: {
        name: this.state.name,
        email: this.state.email
      }
    }

    UserService.update(this.props.userId, payload).then(
      response => {
        this.setState({
          showHide: !this.state.showHide,
          name: '',
          email: ''
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
        <Button onClick={() => this.openFormEditUser()}>
          Edit
        </Button>
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={this.updateUser.bind(this)}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                   value={this.state.name}
                   onChange={e => this.setState({ name: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })} />
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