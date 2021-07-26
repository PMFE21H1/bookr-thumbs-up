import React from "react";
import { Route, Link } from "react-router-dom";
import {
  AuthContext,
  TaxonomyContext,
  UsersDatabaseContext,
} from "../context/context";
import { listResources } from "../resources/resources";
import { listReservations, confirmReservation } from "./reservations";
import Table from "react-bootstrap/Table";
import { Button, Nav } from "react-bootstrap";

export default class ListReservationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      confirmed: [],
      pending: [],
    };
  }

  componentDidMount() {
    listResources().then((resources) => {
      this.setState({ resources: resources });
    });
    let confirmed = [];
    let pending = [];
    listReservations()
      .then((reservations) => {
        reservations.forEach((reservation) =>
          reservation.status === "confirmed"
            ? confirmed.push(reservation)
            : pending.push(reservation)
        );
      })
      .then(() => this.setState({ confirmed: confirmed, pending: pending }));
  }

  render() {
    return (
      <TaxonomyContext.Consumer>
        {(taxonomy) => {
          return (
            <UsersDatabaseContext>
              {(users) => {
                return (
                  <>
                    <Nav>
                      <Nav.Item>
                        <Nav.Link as={Link} to={"/admin/reservations/create"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-columns"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z" />
                          </svg>{" "}
                          Add reservation
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={"/admin/config"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-columns-gap"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
                          </svg>{" "}
                          Config
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <h2>Confirmed Reservations</h2>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Reservations customer</th>
                          <th>Reservations id</th>
                          <th>Reservations time</th>
                          <th>{taxonomy.resource}</th>
                        </tr>
                      </thead>

                      {this.state.confirmed.map((reservation) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                {users.map((user) =>
                                  reservation.customerUid === user.uid
                                    ? user.name
                                    : ""
                                )}
                              </td>
                              <td>{reservation.id}</td>
                              <td>{reservation.slot}</td>
                              <td>
                                {this.state.resources.map((resource) =>
                                  reservation.resource == resource.id
                                    ? resource.name
                                    : ""
                                )}
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}/delete`}
                                  >
                                    DELETE
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}/edit`}
                                  >
                                    EDIT
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}`}
                                  >
                                    DETAILS
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>

                    <h2>Pending Reservations</h2>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Reservations customer</th>
                          <th>Reservations id</th>
                          <th>Reservations time</th>
                          <th>{taxonomy.resource}</th>
                        </tr>
                      </thead>

                      {this.state.pending.map((reservation) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                {users.map((user) =>
                                  reservation.customerUid === user.uid
                                    ? user.name
                                    : ""
                                )}{" "}
                              </td>
                              <td>{reservation.id}</td>
                              <td>{reservation.slot}</td>
                              <td>
                                {this.state.resources.map((resource) =>
                                  reservation.resource == resource.id
                                    ? resource.name
                                    : ""
                                )}
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}/delete`}
                                  >
                                    DELETE
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}/edit`}
                                  >
                                    EDIT
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                              <td>
                                <Nav.Item>
                                  <Nav.Link
                                    as={Link}
                                    to={`/admin/reservations/${reservation.id}`}
                                  >
                                    DETAILS
                                  </Nav.Link>
                                </Nav.Item>
                              </td>
                              <td>
                                <Button
                                  onClick={() =>
                                    confirmReservation(reservation.id)
                                  }
                                >
                                  CONFIRM
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </>
                );
              }}
            </UsersDatabaseContext>
          );
        }}
      </TaxonomyContext.Consumer>
    );
  }
}
