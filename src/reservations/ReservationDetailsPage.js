import React from "react";
import { AuthContext, TaxonomyContext, UsersDatabaseContext } from "../context/context";
import { confirmReservation } from "./reservations";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';

export default class ReservationDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {},
    };
  }
    

    componentDidMount() {
        fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.props.match.params.reservationID}.json`)
            .then(resp => resp.json())
            .then(reservation => {
                if (reservation.status === "confirmed") {
                    this.setState({reservation: reservation, confirmed: true})
                } else {
                    this.setState({reservation: reservation, confirmed: false})
                }

            }).then(() =>
            fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.reservation.resource}.json`)
        ).then(resp => resp.json()).then(resource => this.setState({resourcename: resource.name}))
    }

    onConfirm = () => {
        confirmReservation(this.props.match.params.reservationID)
            .catch(e => Swal.fire({
                            title: "Failed to create a reservation!",
                            text: `${e.message}`,
                            icon: "error",
                            confirmButtonText:"OK"})
            )

            .then(() => this.setState({confirmed: true}))
    }


    render() {
        return (
            <UsersDatabaseContext.Consumer>
                {(usersFromDatabase) => {
                    return (<>

            <TaxonomyContext.Consumer>
                {(taxonomy) => {
                    return (<>
                        <AuthContext.Consumer>
                            {({user}) => {
                                return (<>

                                  <Table>
                                  <thead>
                                    <tr>
                                      <th>Customer</th>
                                      <th>{taxonomy.resource} id</th>
                                      <th>{taxonomy.resource} name</th>
                                      <th>Slot</th>
                                    </tr>
                                  </thead>
                  
                                  <tbody>
                                    <tr>
                                      <td>{usersFromDatabase.map(user => this.state.reservation.customerUid === user.uid ? user.name : "")}</td>
                                      <td>{this.state.reservation.resource}</td>
                                      <td>{this.state.resourcename}</td>
                                      <td>{this.state.reservation.slot}</td>
                                      {user.admin && (
                                        <Button
                                        variant="secondary" size="lg"
                                          disabled={this.state.confirmed}
                                          onClick={this.onConfirm}
                                        style= {{color: "black"}}
                                        >
                                          {this.state.confirmed ? "Confirmed" : "Confirm"}
                                        </Button>
                                      )}
                                    </tr>
                                  </tbody>
                                </Table>
                                </>)
                        
                    }}
                        </AuthContext.Consumer>

                    </>)
                    }}
            </TaxonomyContext.Consumer>
        </>
                    )}
          }
        </UsersDatabaseContext.Consumer>
        )}

      }