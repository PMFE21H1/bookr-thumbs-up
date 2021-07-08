import React, { Route } from 'react'
import { listReservations } from "./reservations";
export default class ListReservationsPage extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <Route path='/admin/reservations'/>
            <p>{listReservations}</p>
            <button><Link to={"/delete/" + this.props.reservations.id}>Delete</Link></button>
            <button><Link to={"/edit/" + this.props.reservations.id}>Edit</Link></button>
            </>
        )
    }
}