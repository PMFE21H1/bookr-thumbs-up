import React from 'react'
import {Link} from "react-router-dom"
import {listReservations, deleteReservation} from "./reservations"

export default class DeleteReservationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: null,
        }
    }

    componentDidMount() {
        fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${URLid}.json`)
            .then(resp => resp.json())
            .then(reservation => {
                this.setState({reservation: reservation})
            })
    }

    render() {
        return (
            <div>
                <p>Are you sure you want to delete the following reservation?</p>
                <table>
                    <tr>
                        <th>Reservations customer</th>
                        <th>Reservations time</th>
                        <th>Reservations resource-id</th>
                    </tr>
                    {this.state.reservation ?
                        <tr>
                            <td>{this.state.reservation.customer}</td>
                            <td>{this.state.reservation.slot}</td>
                            <td>{this.stata.reservation.resource}</td>

                        </tr>


                        :
                            <p></p>
                        }
                </table>

                <button onClick={() => deleteReservation({/*url-ből kiolvasott id*/})}>Delete Reservation</button>
                <Link to="/admin/reservation">Cancel</Link>
            </div>
        )
    }
}
