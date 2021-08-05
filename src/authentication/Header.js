import React, { Component, useContext } from "react";
import {
  AuthContext,
  TaxonomyContext,
  UsersDatabaseContext,
} from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";
import { onAuthStateChanged, getAuth, signOut, AuthCredential } from "firebase/auth";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import "./header.css"

export default function Header() {

  function signout() {
    signOut(getAuth());
  }

  const taxonomy = useContext(TaxonomyContext);

  const {user} = useContext(AuthContext);

  return (
    user == null?
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
                      :
                      user.admin ?
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
                            <Button size="sm" onClick={signout}>
                              {" "}
                              Log out
                            </Button>
                          </Nav>
                        </>
                       : 
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
                            <Button className="logout-btn" onClick={signout}> Log out</Button>
                          </Nav>
                        </>
  );
}
