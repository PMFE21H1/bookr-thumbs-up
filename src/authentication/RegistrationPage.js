import React, { Component, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { saveAccountToDatabase } from "./authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import "./registration.css";

export default function RegistrationPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [name, setName] = useState("");

  function register() {
    if (password === confirmation) {
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.name = name;
          user.admin = false;
          console.log(user);
          saveAccountToDatabase(
            name,
            email,
            false,
            user.uid
          );
          props.onLogIn(user);
          props.history.push("/user/my-reservations");
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
  }

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
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  placeholder="Enter your name"
                  onChange={e => setName(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Email Address</Form.Label>
                <Form.Control
                  placeholder="Enter your email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a new password"
                  onChange={e => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">
                  Password Confirmation
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password again"
                  onChange={e => setConfirmation(e.target.value)}
                ></Form.Control>
                <Button
                  size="lg"
                  className="mt-4 reg-btn"
                  variant="info btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    register();
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