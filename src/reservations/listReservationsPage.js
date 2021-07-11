import React from "react";
import { Route, Link } from "react-router-dom";
import { listReservations } from "./reservations";

export default class ListReservationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
    };
  }

  componentDidMount() {
    listReservations().then((reservations) =>
      this.setState({ reservations: reservations })
    );
  }

  render() {
    return (
      <>
        {/* <Route path="/admin/reservations"> */}
        <button>Add reservation</button>
        <table>
          <tr>
            <th>Reservations customer</th>
            <th>Reservations id</th>
            <th>Reservations time</th>
            <th>Reservations resource-id</th>
          </tr>
          {this.state.reservations ? (
            this.state.reservations.map((reservation) => {
              return (
                <tr>
                  <td>{reservation.customer}</td>
                  <td>{reservation.id}</td>
                  <td>{reservation.slot}</td>
                  <td>{reservation.resource}</td>
                  <td>
                     <Link to={`/admin/reservations/${reservation.id}/delete`}>
                        Delete
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/reservations/${reservation.id}/edit`}>
                        Edit
                      </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <p></p>
          )}
        </table>
        {/* </Route> */}
      </>
    );
  }
}
