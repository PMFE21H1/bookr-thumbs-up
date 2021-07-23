import React from "react";
import { Route, Link } from "react-router-dom";
import { AuthContext, UsersDatabaseContext } from "../context/context";
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
      <UsersDatabaseContext>
        {(users) => {
          return (
            <>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/admin/reservations/create"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
</svg> Add reservation
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/admin/config"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16">
  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/>
</svg> Config
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
                    <th>Resource</th>
                  </tr>
                </thead>

                {this.state.confirmed.map((reservation) => {
                  //itt kell majd a userDatabaseConsumer
                  return (
                    <tbody>
                      <tr>
                        <td>
                          {users.map((user) => {
                            if (reservation.customerUid === user.uid) {
                              return user.name;
                            }
                          })}
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
                          <Link
                            to={`/admin/reservations/${reservation.id}/delete`}
                          >
                            DELETE
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/admin/reservations/${reservation.id}/edit`}
                          >
                            EDIT
                          </Link>
                        </td>
                        <td>
                          <Link to={`/admin/reservations/${reservation.id}`}>
                            DETAILS
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>

              <h2>Pending Reservations</h2>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>Reservations customer</th>
                    <th>Reservations id</th>
                    <th>Reservations time</th>
                    <th>Resource</th>
                  </tr>
                  {this.state.pending.map((reservation) => {
                    return (
                      <tr>
                        <td>{reservation.customerUid}</td>
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
                          <Link
                            to={`/admin/reservations/${reservation.id}/delete`}
                          >
                            DELETE
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/admin/reservations/${reservation.id}/edit`}
                          >
                            EDIT
                          </Link>
                        </td>
                        <td>
                          <Link to={`/admin/reservations/${reservation.id}`}>
                            DETAILS
                          </Link>
                        </td>
                        <td>
                          <Button
                            onClick={() => confirmReservation(reservation.id)}
                          >
                            CONFIRM
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          );
        }}
      </UsersDatabaseContext>
    );
  }
}
