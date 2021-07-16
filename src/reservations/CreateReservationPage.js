import React, {Component} from 'react'
import {listResources, Resource} from '../resources/resources'
import {createReservation, Reservation} from './reservations'
import SlotSelector from "./SlotSelector";
import {AuthContext} from "../App";


export default class CreateReservationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resourceToSubmit: {},
            resource: "",
            customer: "",
            date: "",
            time: "",
            resources: []


        }
    }

    componentDidMount() {
        listResources().then(resourcesArr => resourcesArr.map(
            resource => {
                this.setState(() => {
                    return {resources: [...this.state.resources, resource]}
                })
            }
        ))
    }

    changeCustomer = (e) => {
        this.setState({customer: e.target.value})
    }


    changeResource = (e) => {
        this.state.resources.forEach(resource => {
            if (resource.id === e.target.value) {
                this.setState({resourceToSubmit: resource, resource: resource.id})
            }
        })
    }

    changeSlot = (date, time) => {
        this.setState(() => {
            return {date: date, time: time}
        })
        console.log(this.state)
    }

    changeToDefault = () => {
        this.setState({
            resource: "",
            customer: "",
            date: "",
            time: "",
        })
    }

    onClickCreateReservation = (e, user) => {
        e.preventDefault();

        if (user.email==="admin@admin.com") {

            createReservation(new Reservation(this.state.customer, this.state.resource, `${this.state.date}T${this.state.time}`, "confirmed")).catch((error) => {
                    alert(error.message)
                }
            )
        } else {
            createReservation(new Reservation(this.state.customer, this.state.resource, `${this.state.date}T${this.state.time}`, "pending")).catch((error) => {
                    alert(error.message)
                }
            )
        }
        this.changeToDefault()

    }

    render() {

        return (

            <AuthContext.Consumer>
                {({user, ...rest}) => {
                    return (
                        <form>

                            <h3>Create Reservation</h3>

                            <div>


                                <label>Resource:</label>
                                <select onChange={e => this.changeResource(e)} value={this.state.resource}>
                                    <option value={null}>Select a resource</option>

                                    {(this.state.resources !== []) ?

                                        this.state.resources.map(resource =>
                                            <option key={resource.id} value={resource.id}>{resource.name}</option>
                                        )

                                        :

                                        ""
                                    }

                                </select>
                            </div>

                            <div>
                                <label>Customer:</label>
                                <input onChange={(e) => this.changeCustomer(e)} value={this.state.customer}></input>
                            </div>

                            <SlotSelector resource={this.state.resource} changeSlot={this.changeSlot}></SlotSelector>

                            <button onClick={
                                (e) => {
                                    this.onClickCreateReservation(e, user)
                                }}>Create
                            </button>

                            <button>Cancel</button>


                        </form>

                    )
                }}
            </AuthContext.Consumer>
        )
    }
}
