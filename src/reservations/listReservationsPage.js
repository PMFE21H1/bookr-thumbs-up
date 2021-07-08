import React, { Route, Link } from 'react'
export default class ListReservationsPage extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          < >
            <Route path='/admin/reservations'/>
            <p>{listReservations}</p>
            <button><Link to={"/admin/reservations/:reservationID/delete/"}>Delete</Link></button>
            <button><Link to={"/admin/reservations/:reservationID/edit/" + this.props.reservations.id}>Edit</Link></button>
            </>
        )
    }
}
// nem vagyok meg biztos benne, hogy melyik verzio fog nekunk kelleni(a url-es vagy a props alapu id kereses)