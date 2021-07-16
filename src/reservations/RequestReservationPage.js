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
    changeSlot=(date, time) => {
        this.setState({
            date: date,
            time: time
        })
    }

    render() {
        return (
            <>
                <SlotSelector resource={ this.props.match.params.resourceID} changeSlot={this.changeSlot}/>
            </>

        )
    }
}