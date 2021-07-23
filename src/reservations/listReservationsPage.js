import React from "react";
import {Link} from "react-router-dom";
import {UsersDatabaseContext} from "../context/context"
import {listResources} from "../resources/resources";
import {listReservations, confirmReservation} from "./reservations";

export default class ListReservationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            confirmed: [],
            pending:[]
        };
    }

    componentDidMount() {
        listResources().then((resources) => {
                this.setState({resources: resources})
            }
        )
        let confirmed = [];
        let pending = [];
        listReservations().then((reservations) => {
            reservations.forEach(reservation => reservation.status === "confirmed" ? confirmed.push(reservation) : pending.push(reservation))
        })
            .then(() => this.setState({confirmed: confirmed, pending: pending}));

    }

    render() {

        return (

            <UsersDatabaseContext>
                {users => {
                    return <>
                <Link to={"/admin/reservations/create"}>Add reservation</Link>
                <Link to={"/admin/config"}>Config</Link>

                <h2>Confirmed Reservations</h2>
                <table>
                    <tr>
                        <th>Reservations customer</th>
                        <th>Reservations id</th>
                        <th>Reservations time</th>
                        <th>Resource</th>
                    </tr>
                    {this.state.confirmed.map(reservation => {
                                return (
                                    <tr>
                                        <td>{users.map(user => reservation.customerUid === user.uid ? user.name : "")}</td>
                                        <td>{reservation.id}</td>
                                        <td>{reservation.slot}</td>
                                        <td>{this.state.resources.map(resource => reservation.resource == resource.id ? resource.name : "")}</td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}/delete`}>
                                                DELETE
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}/edit`}>
                                                EDIT
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}`}>
                                                DETAILS
                                            </Link>
                                        </td>
                                    </tr>
                                );

                            })}
                </table>


                <h2>Pending Reservations</h2>
                <table>
                    <tr>
                        <th>Reservations customer</th>
                        <th>Reservations id</th>
                        <th>Reservations time</th>
                        <th>Resource</th>
                    </tr>
                    {
                            this.state.pending.map(reservation => {
                                return (
                                    <tr>
                                        <td>{users.map(user => reservation.customerUid === user.uid ? user.name : "")} </td>
                                        <td>{reservation.id}</td>
                                        <td>{reservation.slot}</td>
                                        <td>{this.state.resources.map(resource => reservation.resource == resource.id ? resource.name : "")}</td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}/delete`}>
                                                DELETE
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}/edit`}>
                                                EDIT
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/reservations/${reservation.id}`}>
                                                DETAILS
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={()=>confirmReservation(reservation.id)}>
                                                CONFIRM
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}


                </table>
        </>
        }}
        </UsersDatabaseContext>
        );
    }
}
