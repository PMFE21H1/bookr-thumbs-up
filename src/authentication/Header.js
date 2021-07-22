import React, { Component } from "react";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {({ user }) => {
            if (!user) {
              return (
                <>
                  <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/login">
                        Log In
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/registration">
                        Registration
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/resources">
                        Public Recources
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </>
              );
            } else {
              return user.admin ? (
                <>
                  <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/admin/resources">
                        Resources
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/admin/reservations">
                        Reservations
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="disabled" disabled>
                        Admin
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/my-reservations">
                        Reservations
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/resources">
                        Public Recources
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="disabled" disabled>
                        User
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </>
              );
            }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}
