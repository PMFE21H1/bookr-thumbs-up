import React from 'react'
import {Link} from "react-router-dom"
import {listReservations, deleteReservation} from "./reservations"
import {TaxonomyContext} from "../context/context";

export default class DeleteReservationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: null,
        }
    }

    componentDidMount() {
        fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.props.match.params.reservationID}.json`)
            .then(resp => resp.json())
            .then(reservation => {
                this.setState({reservation: reservation})
            })
    }

    render() {
        return (
            <TaxonomyContext.Consumer>
                { (taxonomy)=>{
           return <div>
                <p>Are you sure you want to delete the following reservation?</p>
                <table>
                    <tr>
                        <th>Reservations customer</th>
                        <th>Reservations time</th>
                        <th>Reservations {taxonomy.resource}-id</th>
                    </tr>
                    {this.state.reservation ?
                        <tr>
                            <td>{this.state.reservation.customer}</td>
                            <td>{this.state.reservation.slot}</td>
                            <td>{this.state.reservation.resource}</td>

                        </tr>


                        :
                            <p></p>
                        }
                </table>

                <button onClick={() => deleteReservation(this.props.match.params.reservationID) .then(this.props.history.push("/admin/reservations"))}>Delete Reservation</button>
                <button onClick={() => this.props.history.push("/admin/reservations")}> Cancel</button>
            </div>
                }

                }
            </TaxonomyContext.Consumer>
        )
    }
}
