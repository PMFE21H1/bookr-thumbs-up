import React, { Route, Link } from 'react'
import { listReservations } from './reservations'
export default class ListReservationsPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reservations: null
        }
    }
    getReservations = () => {
        listReservations().then(reservations => this.setState({reservations: reservations}))
    }
    componentDidMount() {
        this.getReservations()
    }
    render(){
        return(
          <>
            <Route path='/admin/reservations'>
                <button>Add reservation</button>
            <table>
                <tr>
                    <th>Reservations name</th><th>Reservations id</th>
                </tr>
                {
                    this.state.reservations?
                    this.state.reservations.map(reservation =>{
                        return(
                            <tr>
                                <td>{reservation.name}</td>
                                <td>{reservation.id}</td>
                                <td><Link to={"/admin/reservations/:reservationID/delete/"}>Delete</Link></td>
                                <td><Link to={"/admin/reservations/:reservationID/edit/"}>Edit</Link></td>
                            </tr>
                        )
                    })
                    :
                    <li></li>
                }
            </table>
            
            
            </Route>
            </>
        )
    }
}