import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { saveAccountToDatabase } from "./authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import {Col, Container, Row, Form, Button, Image} from "react-bootstrap";
import "./registration.css"

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmation: "",
      name: "",
    };
  }

  register = () => {
    if (this.state.password === this.state.confirmation) {
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.name = this.state.name;
          user.admin = false;
          console.log(user);
          saveAccountToDatabase(
            this.state.name,
            this.state.email,
            false,
            user.uid
          );
          this.props.onLogIn(user);
          this.props.history.push("/user/my-reservations");
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      throw new Error(
        "The password and the confirmation-password didn't match"
      );
    }
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmation = (e) => {
    this.setState({
      confirmation: e.target.value,
    });
  };
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <Container className="registration-super-container">
          <Row className="mt-4">
            <Col
                lg={5}
                md={6}
                sm={12}
                className="p-5 m-auto shadow-sm rounded-lg "
            >
              <div className="registration-cont  p-5 ">
          <Form.Group>


          <h3 className="shadow-sm tect-success mt-3 p-3 text-center  ">
            Registration Page</h3>
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            placeholder="Enter your name"  onChange={(e) => this.handleName(e)}></Form.Control>
          <Form.Label
            className="mt-2">
            Email Address
          </Form.Label>
          <Form.Control
             placeholder="Enter your email"  type="email" onChange={(e) => this.handleEmail(e)}></Form.Control>
          <Form.Label
              className="mt-2">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a new password" onChange={(e) => this.handlePassword(e)}
          ></Form.Control>
          <Form.Label
              className="mt-2">
            Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password again" onChange={(e) => this.handleConfirmation(e)}
          ></Form.Control>
          <Button
              size="lg"
              className="mt-4 reg-btn"
              variant="info btn-block"
              onClick={(e) => {
                e.preventDefault();
                this.register();
              }}
          >
            Registration
          </Button>


          </Form.Group>
            </div>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}
{
}
