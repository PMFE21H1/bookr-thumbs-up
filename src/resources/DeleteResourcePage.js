import React from "react";
import {Link} from "react-router-dom";
import {listReservations} from "../reservations/reservations";
import {deleteResource} from "./resources";
import {TaxonomyContext} from "../context/context";
import {UpdateResourcePage} from "./UpdateResourcePage";
import Table from "react-bootstrap/Table";
import { Button, ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default class DeleteResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceId: this.props.match.params.resourceID,
            reservations: [],
        };
    }

    componentDidMount() {
        //lekérem az összes reservation adatát, hogy ki tudjam írni a relevánsakat
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
        deleteResource(this.state.resource).then(() => this.props.history.push(`/admin/${this.context.resources}`));
    } catch (e) {
        alert(e.message);
    }
};

  render() {
    return (
      <div>
        <Card.Body>
          <Card.Title>
            Are you sure you want to delete the resource along with the
            following reservations?
          </Card.Title>
        </Card.Body>

        {this.state.reservations.map((reservation) => {
          if (reservation.resource === this.state.resourceId) {
            return (
              <div>
                <Card style={{ width: "18rem" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {reservation.customer}, {reservation.slot}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          }
        })}

        <Button onClick={this.handleDelete}>Delete</Button>

        <Link to={`/admin/config/${this.context.resources}`}>
          <Button variant="danger">Cancel</Button>
        </Link>
      </div>
    );
  }
}

DeleteResourcePage.contextType = TaxonomyContext
