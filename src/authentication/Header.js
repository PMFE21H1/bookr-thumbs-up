import React, { Component } from "react";
import {
  AuthContext,
  TaxonomyContext,
  UsersDatabaseContext,
} from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  signout = () => {
    signOut(getAuth());
  };

  render() {
    return (
      <div>
        <TaxonomyContext.Consumer>
          {(taxonomy) => {
            return (
              <>
                <AuthContext.Consumer>
                  {({ user }) => {
                    console.log(user);
                    if (!user) {
                      return (
                        <>
                          <Nav
                            className="justify-content-center"
                            activeKey="/home"
                          >
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
                              <Nav.Link as={Link} to={`/${taxonomy.resources}`}>
                                Public {taxonomy.resources}
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </>
                      );
                    } else {
                      return user.admin ? (
                        <>
                          <Nav
                            className="justify-content-center"
                            activeKey="/home"
                          >
                            <Nav.Item>
                              <Nav.Link
                                as={Link}
                                to={`/admin/config/${taxonomy.resources}`}
                              >
                                {taxonomy.resources}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link as={Link} to="/admin/reservations">
                                Reservations
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link as={Link} to="/admin/config">
                                Config
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link
                                as={Link}
                                to="/admin/config/resources/taxonomy"
                              >
                                Taxonomy
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="disabled" disabled>
                                Logged in as Admin
                              </Nav.Link>
                            </Nav.Item>
                            <Button size="sm" onClick={this.signout}> Log out</Button>
                          </Nav>
                          
                        </>
                      ) : (
                        <>
                          <Nav
                            className="justify-content-center"
                            activeKey="/home"
                          >
                            <Nav.Item>
                              <Nav.Link as={Link} to="/my-reservations">
                                Reservations
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link as={Link} to={`/${taxonomy.resources}`}>
                                Public {taxonomy.resources}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="disabled" disabled>
                                Hello, {user.name}!
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Button onClick={this.signout}> Log out</Button>
                        </>
                      );
                    }
                  }}
                </AuthContext.Consumer>
              </>
            );
          }}
        </TaxonomyContext.Consumer>
      </div>
    );
  }
}
