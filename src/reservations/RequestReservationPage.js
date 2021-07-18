import React, {Component} from 'react';
import SlotSelector from "./SlotSelector";
import {createReservation, listReservations, Reservation} from "./reservations";
import CreateReservationPage from "./CreateReservationPage";
import {AuthContext} from "../App";

export default class RequestReservationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        listReservations()
            .then((reservations) => this.setState({
                    reservations: reservations
                })
            )
    }
    changeSlot=(date, time) => {
        this.setState({
            date: date,
            time: time
        })
    }



    render() {
        return (
            <>
                <AuthContext.Consumer>
                    {({ user, ...rest }) => {
                        return (
                <form>
                <SlotSelector resource={ this.props.match.params.resourceID} changeSlot={this.changeSlot}/>
                <button onClick={ (e) => {
                    e.preventDefault()
                    try{createReservation(new Reservation(user.name, this.props.match.params.resourceID, `${this.state.date}T${this.state.time}`,"pending"))
                        .catch((e) => alert(e.message))} catch(error){alert(error)}

                }} > Create </button>
            </form>)
                    }}
                </AuthContext.Consumer>
            </>

        )
    }
}