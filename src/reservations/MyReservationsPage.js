
import React from "react"
import {AuthContext, UsersDatabaseContext} from "../context/context"
import {listUsersReservations} from "./reservations"
import {listResources} from "../resources/resources";
import {Link} from "react-router-dom"



export default class MyReservationsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            reservations:[],
            resources:[]
        }
    }

    componentDidMount() {
        console.log("didmount")
        //this.context=AuthContextből érkező user
        listUsersReservations(this.context.user)
            .then(searchedReservation=>this.setState({reservations:searchedReservation}))

        listResources().then(resources=>this.setState({resources:resources}))

    }

    render(){
        return(
            <>
            {
                this.state.reservations!==[]  ?


                    <table>
                        {this.state.reservations.map(reservation => {
                            return (<tr>
                                {this.state.resources.map(resource => {
                                    if (resource.id === reservation.resource) {
                                        return <td>{resource.name}</td>
                                    }
                                })}
                                <td>{reservation.slot}</td>
                                <td>{reservation.status}</td>
                                <td><Link to={`/my-reservations/${reservation.id}`}>Details</Link></td>
                            </tr>)
                        })}

                    </table>
                    :
                    <h1>You have no reservations yet</h1>
            }
            </>
        )
    }
}

MyReservationsPage.contextType=AuthContext
//this.context-en keresztül elérhető a user


