import React, { Component } from "react";
import {
  AuthContext,
  TaxonomyContext,
  UsersDatabaseContext,
} from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import "./header.css"

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
                            className="justify-content-start align-items-center mt-2 nav-cont"
                            activeKey="/home"
                          >

                            <Nav.Item className="navbar-img-cont">
                              <Link to="/"><img src="https://firebasestorage.googleapis.com/v0/b/bookr-thumbs-up.appspot.com/o/thumbsup2.png?alt=media&token=5239d2d5-9788-4dd1-880c-17ed64ab4697"/></Link>
                            </Nav.Item>
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
                              <Nav.Link as={Link} to={`/${taxonomy.url}`}>
                                Our {taxonomy.resources}
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </>
                      );
                    } else {
                      return user.admin ? (
                        <>
                          <Nav
                              className="justify-content-start align-items-center mt-2 nav-cont-admin"
                              activeKey="/home"
                          >

                            <Nav.Item className="navbar-img-cont">
                            <Link to="/"><img src="https://firebasestorage.googleapis.com/v0/b/bookr-thumbs-up.appspot.com/o/thumbsup2.png?alt=media&token=5239d2d5-9788-4dd1-880c-17ed64ab4697"/></Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link
                                as={Link}
                                to={`/admin/config/${taxonomy.url}`}
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
                              <Nav.Link eventKey="disabled" disabled>
                                Logged in as Admin
                              </Nav.Link>
                            </Nav.Item>
                            <Button size="sm" onClick={this.signout}>
                              {" "}
                              Log out
                            </Button>
                          </Nav>
                        </>
                      ) : (
                        <>
                          <Nav
                              className="justify-content-start align-items-center mt-2 nav-cont"
                              activeKey="/home"
                          >

                            <Nav.Item className="navbar-img-cont">
                            <Link to="/"><img src="https://firebasestorage.googleapis.com/v0/b/bookr-thumbs-up.appspot.com/o/thumbsup2.png?alt=media&token=5239d2d5-9788-4dd1-880c-17ed64ab4697"/></Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link as={Link} to="/my-reservations">
                                Reservations
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link as={Link} to={`/${taxonomy.url}`}>
                                Our {taxonomy.resources}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="disabled" disabled>
                                Hello, {user.name}!
                              </Nav.Link>
                            </Nav.Item>
                            <Button className="logout-btn" onClick={this.signout}> Log out</Button>
                          </Nav>
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
