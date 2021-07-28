import React from "react";
import { Link } from "react-router-dom";
import { listReservations, deleteReservation } from "./reservations";
import Table from "react-bootstrap/Table";
import { Button, Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { UsersDatabaseContext, TaxonomyContext } from "../context/context";

export default class DeleteReservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.props.match.params.reservationID}.json`
    )
      .then((resp) => resp.json())
      .then((reservation) => {
        this.setState({ reservation: reservation });
      });
  }

  render() {
    return (
      <TaxonomyContext.Consumer>
        {(taxonomy) => {
          return (
            <div>
              <Card.Body>
                <Card.Title>
                  <Nav className="justify-content-center mt-2">
                    Are you sure you want to delete the following reservation?
                  </Nav>
                </Card.Title>
              </Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Reservations customer</th>
                    <th>Reservations time</th>
                    <th>Reservations {taxonomy.resource}-id</th>
                  </tr>
                </thead>

                {this.state.reservation ? (
                  <tbody>
                    <tr>
                      <td>
                        {this.context.map((user) => {
                          if (this.state.reservation.customerUid === user.uid) {
                            return user.name;
                          }
                        })}
                      </td>

                      <td>{this.state.reservation.slot}</td>
                      <td>{this.state.reservation.resource}</td>
                    </tr>
                  </tbody>
                ) : (
                  <p></p>
                )}
              </Table>
              <Nav className="justify-content-center mt-2">
                <Nav className="mr-2">
                  <Button
                      style ={{marginRight: "1vw" }}
                      onClick={() =>
                    deleteReservation(
                      this.props.match.params.reservationID
                    ).then(this.props.history.push("/admin/reservations"))
                  }
                >
                  Delete Reservation
                </Button>
                </Nav>
                
                <Button
                  variant="danger"
                  onClick={() => this.props.history.push("/admin/reservations")}
                >
                  {" "}
                  Cancel
                </Button>
              </Nav>
            </div>
          );
        }}
      </TaxonomyContext.Consumer>
    );
  }
}
DeleteReservationPage.contextType = UsersDatabaseContext;
