import React from "react";
import { Route, Link } from "react-router-dom";
import { listResources } from "../resources/resources";
import { listReservations } from "./reservations";

export default class ListReservationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      resources: null
    };
  }

  componentDidMount() {
    listReservations().then((reservations) =>{
      console.log(reservations)
      this.setState({ reservations: reservations })
    });
    listResources().then((resources) => {
      console.log(resources)
      this.setState({resources: resources})
    }
    )
  }

  render() {
    return (
      <>

        <Link to={"/admin/reservations/create"}>Add reservation</Link>
        <table>
          <tr>
            <th>Reservations customer</th>
            <th>Reservations id</th>
            <th>Reservations time</th>
            <th>Resource</th>
          </tr>
          {this.state.reservations ? (
            this.state.reservations.map((reservation) => {
              return (
                <tr>
                  <td>{reservation.customer}</td>
                  <td>{reservation.id}</td>
                  <td>{reservation.slot}</td>
                  <td>{this.state.resources.map(resource => reservation.resource == resource.id ? resource.name : "")}</td>
                  <td>
                     <Link to={`/admin/reservations/${reservation.id}/delete`}>
                        DELETE
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/reservations/${reservation.id}/edit`}>
                        EDIT
                      </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <p></p>
          )}
        </table>
      </>
    );
  }
}
