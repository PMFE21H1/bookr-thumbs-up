import React from "react";

export default class ReservationDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            reservationID :"",
            reservation: null
        }
    }

    componentDidMount() {
        fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.props.match.params.reservationID}.json`)
            .then(resp => resp.json())
            .then(reservation => {
                this.setState({reservation: reservation})
            }).then( ()=>
                fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.reservation.resource}.json`)
        ).then ( resp => resp.json()).then(resource => this.setState( {resourcename: resource.name}))
    }



    render() {
        return(
            <>
                {this.state.reservation ?
                    <table>
                        <tr>
                            <td>{this.state.reservation.customer}</td>
                            <td>{this.state.reservation.resource}</td>
                            <td>{this.state.resourcename}</td>
                            <td>{this.state.reservation.slot}</td>
                            <button>Confirm</button>
                        </tr>
                    </table>
                    :
                    ""
                }


            </>
        )
    }
}