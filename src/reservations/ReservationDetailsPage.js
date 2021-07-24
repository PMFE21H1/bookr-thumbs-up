import React from "react";
import {AuthContext, TaxonomyContext, UsersDatabaseContext} from "../context/context"
import {confirmReservation} from "./reservations";

export default class ReservationDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: {},

        }
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
            .catch(e => alert(e.message))
            .then(() => this.setState({confirmed: true}))
    }


    render() {
        return (
            <UsersDatabaseContext.Consumer>
                {(usersFromDatabase) => {
                    return (<>

            <TaxonomyContext.Consumer>
                {(taxonomy) => {
                    return <>
                        <AuthContext.Consumer>
                            {({user}) => {
                                return (
                                    <table>
                                        <tr>
                                            <td>Customer</td>
                                            <td>{taxonomy.resource} id</td>
                                            <td>{taxonomy.resource} name</td>
                                            <td>Slot</td>
                                        </tr>

                                        <tr>

                                    <td>{usersFromDatabase.map(user => this.state.reservation.customerUid === user.uid ? user.name : "")}</td>
                                    <td>{this.state.reservation.resource}</td>
                                    <td>{this.state.resourcename}</td>
                                    <td>{this.state.reservation.slot}</td>
                                    {user.admin&&
                                        <button disabled={this.state.confirmed} onClick={this.onConfirm}>{this.state.confirmed ? "Confirmed" : "Confirm"}</button>
                                        }
                                </tr>
                            </table>
                        )
                    }}
                        </AuthContext.Consumer>

                    </>
                    }}
            </TaxonomyContext.Consumer>
        </>)
            }}
        </UsersDatabaseContext.Consumer>
        )
    }
}