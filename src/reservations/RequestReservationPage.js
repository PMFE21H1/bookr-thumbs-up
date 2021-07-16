import React, {Component} from 'react';
import SlotSelector from "./SlotSelector";
import {listReservations} from "./reservations";
import CreateReservationPage from "./CreateReservationPage";

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

    render() {
        return (
            <>
                <SlotSelector/>
            </>

        )
    }
}