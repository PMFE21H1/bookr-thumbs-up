import React from "react";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { listUsersReservations } from "./reservations";
import { listResources } from "../resources/resources";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default class MyReservationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      resources: [],
    };
  }

  componentDidMount() {
    console.log("didmount");
    listUsersReservations(this.context.user).then((searchedReservation) =>
      this.setState({ reservations: searchedReservation })
    );

    listResources().then((resources) =>
      this.setState({ resources: resources })
    );
  }

  render() {
    return (
      <>
        {this.state.reservations !== [] ? (
          <Table>
            {this.state.reservations.map((reservation) => {
              return (
                <tbody>
                  <tr>
                    {this.state.resources.map((resource) => {
                      if (resource.id === reservation.resource) {
                        return <td>{resource.name}</td>;
                      }
                    })}
                    <td>{reservation.slot}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <Link to={`/my-reservations/${reservation.id}`}>
                        Details
                      </Link>
                    </td>
                  </tr>{" "}
                </tbody>
              );
            })}
          </Table>
        ) : (
          <h1>You have no reservations yet</h1>
        )}
      </>
    );
  }
}

MyReservationsPage.contextType = AuthContext;
