import React from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../reservations/reservations";
import { deleteResource } from "./resources";

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
      deleteResource(this.state.resource);
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div>
        <p>
          Are you sure you want to delete the resource along with the following
          reservations?
        </p>
        {this.state.reservations.map((reservation) => {
          if (reservation.resource === this.state.resourceId) {
            return (
              <div>
                <p>
                  {reservation.customer}, {reservation.slot}
                </p>
              </div>
            );
          }
        })}
        
          <button  onClick={this.handleDelete}>Delete</button>
        <Link to={"/admin/resources"} exact>
          Cancel
        </Link>
      </div>
    );
  }
}
