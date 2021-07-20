import React, {Component} from 'react'
import {listResources, Resource} from '../resources/resources'
import {createReservation, Reservation} from './reservations'
import SlotSelector from "./SlotSelector";
import {AuthContext, UsersDatabaseContext} from "../context/context"
import UserSelector from './UserSelector';


export default class CreateReservationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resourceToSubmit: {},
            resource: "",
            customerUid: "",
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

    changeCustomer = (newUserUid) => {
        console.log(newUserUid)
        this.setState({customerUid: newUserUid})
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
            customerUid: "",
            date: "",
            time: "",
        })
    }

    onClickCreateReservation = (e, user) => {
        e.preventDefault();
        try{createReservation(new Reservation(this.state.customerUid, this.state.resource, `${this.state.date}T${this.state.time}`, "confirmed")).catch((error) => {
                    alert(error.message)
                }

            ) .then(()=>this.props.history.push('/admin/reservations'))}catch(e){
            alert(e.message)
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
                                <UserSelector onHandleName={this.changeCustomer}/>
                            </div>

                            <SlotSelector resource={this.state.resource} changeSlot={this.changeSlot}></SlotSelector>

                            <button onClick={
                                (e) => {
                                    console.log(user)
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
