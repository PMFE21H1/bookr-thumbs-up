import React from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../reservations/reservations";
import { deleteResource } from "./resources";
import { TaxonomyContext, UsersDatabaseContext } from "../context/context";
import { UpdateResourcePage } from "./UpdateResourcePage";
import Table from "react-bootstrap/Table";
import { Button, ListGroup, Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";

export default class DeleteResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceId: this.props.match.params.resourceID,
      reservations: [],
    };
  }

  componentDidMount() {
    listReservations().then((reservations) =>
      this.setState({
        reservations: reservations,
      })
    );

    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.resourceId}.json`
    )
      .then((response) => response.json())
      .then((resource) => this.setState({ resource: resource }))
      .then(() =>
        this.setState({
          resource: { ...this.state.resource, id: this.state.resourceId },
        })
      );
  }
  handleDelete = () => {
    try {
      deleteResource(this.state.resource).then(() =>
        this.props.history.push(`/admin/${this.context.resources}`)
      );
    } catch (e) {
      Swal.fire({
        title: "Failed to delete the resource!",
        text: `${e.message}`,
        icon: "error",
        confirmButtonText:"OK"})
    }
  };

  render() {
    return (
      <UsersDatabaseContext>
        {(users) => {
          return (
            <>
              <Nav className="justify-content-center mt-5 text-center">
                <Card.Body>
                  <Card.Title>
                    Are you sure you want to delete the resource along with the
                    following reservations?
                  </Card.Title>
                </Card.Body>
              </Nav>

              {this.state.reservations.map((reservation) => {
                if (reservation.resource === this.state.resourceId) {
                  return (
                    <div>
                      <Nav className="justify-content-center mt-2">
                        <Card style={{ width: "18rem" }}>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              {users.map((user) => {
                                if (reservation.customerUid === user.uid) {
                                  return user.name;
                                }
                              })}
                              :
                              {reservation.slot.split("T")[0] +
                                " " +
                                reservation.slot.split("T")[1]}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </Nav>
                    </div>
                  );
                }
              })}
              <Nav className="justify-content-center mt-2">
                <Nav className="mr-2">
                  <Button onClick={this.handleDelete}>Delete</Button>
                </Nav>

                <Nav>
                  <Link to={`/admin/config/${this.context.resources}`}>
                    <Button variant="danger">Cancel</Button>
                  </Link>
                </Nav>
              </Nav>
            </>
          );
        }}
      </UsersDatabaseContext>
    );
  }
}

DeleteResourcePage.contextType = TaxonomyContext;
