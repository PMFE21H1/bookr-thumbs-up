import React, {Component} from 'react';
import SlotSelector from "./SlotSelector";
import {createReservation, listReservations, Reservation} from "./reservations";
import {AuthContext, UsersDatabaseContext} from "../context/context"
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

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
                        return <>
                <form>
                <SlotSelector resource={ this.props.match.params.resourceID} changeSlot={this.changeSlot}/>
                <button onClick={ (e) => {
                    e.preventDefault()
                    try{
                        createReservation(new Reservation(user.uid, this.props.match.params.resourceID, `${this.state.date}T${this.state.time}`,"pending"))
                        
                        .then(()=>this.props.history.push('/my-reservations'))
                        .catch((e) => Swal.fire({
                            title: "Failed to create an account!",
                            text: `${e.message}`,
                            icon: "error",
                            confirmButtonText:"OK"}))
      
                    } catch(error) {Swal.fire({
                        title: "Failed to create an account!",
                        text: `${error.message}`,
                        icon: "error",
                        confirmButtonText:"OK"})}

                }} > Create </button>

                    <Link to ="/resources"> Cancel </Link>
            </form>
            </>
            
                    }}
                </AuthContext.Consumer>
            </>

        )
    }
}