import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { listUsersFromDatabase, getUserByUid } from "./authentication";
import { tsImportEqualsDeclaration } from "@babel/types";
import "./login.css";
import { Link } from "react-router-dom"

import { Col, Container, Row, Form, Button, Image } from "react-bootstrap";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  logIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        getUserByUid(user.uid).then((userByUid) => {
          this.props.onLogIn(userByUid, () =>
            userByUid.admin
              ? this.props.history.push("/admin/reservations")
              : this.props.history.push("/my-reservations")
          );
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  render() {
    return (
      <>
        <Container className="login-super-container">
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg "
            >
              <div className="login-container">
                {" "}
                <Form>
                  <Form.Group controlId="FormBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => this.setEmail(e)}
                      value={this.state.email}
                      className="login-input"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="FormBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => this.setPassword(e)}
                      value={this.state.password}
                      className="login-input"
                    ></Form.Control>
                  </Form.Group>
                  {/* <span>E-mail</span>
            <input
              type="email"
              onChange={(e) => this.setEmail(e)}
              value={this.state.email}
            />
            <span>Password</span>
            <input
              type="password"
              onChange={(e) => this.setPassword(e)}
              value={this.state.password}
            /> */}
                  <Button
                    className="login-submit-button log-btn"
                    variant="info btn-block"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.logIn();
                    }}
                  >
                    Login
                  </Button>
                  <p
                  className="reg-click">Dont have an account? <Link to="/registration">Click here!</Link></p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
