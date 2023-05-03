import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

import UserService from "../../services/user.service";

export default class EditUserComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      showHide : false,
      user: {}
    }
    this.openViewUser = this.openViewUser.bind(this);
  };

  openViewUser() {
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

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }

  render(){
    return(
      <div>
        <Button onClick={() => this.openViewUser()}>
          View
        </Button>
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          <Modal.Title>{this.state.user.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.user.email}
                  onChange={e => this.setState({ userEmail: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}