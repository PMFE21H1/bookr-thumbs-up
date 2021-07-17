import React from "react";
import {Route, Link} from "react-router-dom";
import {listResources} from "../resources/resources";
import {listReservations} from "./reservations";

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
            <>

                <Link to={"/admin/reservations/create"}>Add reservation</Link>

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
                                        <td>{reservation.customer}</td>
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
                                        <td>{reservation.customer}</td>
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
                                            <Link>
                                                CONFIRM
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}


                </table>

            </>
        );
    }
}
