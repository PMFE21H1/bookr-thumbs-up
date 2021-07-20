
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
        //this.context=AuthContextből érkező user
        listUsersReservations(this.context.user)
            .then(searchedReservation=>this.setState({reservations:searchedReservation}))

        listResources().then(resources=>this.setState({resources:resources}))

    }

    render(){
        return(
            <div>
                {this.state.reservations.map(reservation=>{
                    return (<div>
                        {this.state.resources.map(resource=>{
                            if(resource.id===reservation.resource){
                                return <span>{resource.name}</span>
                            }
                        })}
                        <span>{reservation.slot}</span>
                        <span>{reservation.status}</span>
                        <Link to={`/my-reservations/${reservation.id}`}>Details</Link>
                    </div>)
                })}

            </div>
        )
    }
}

MyReservationsPage.contextType=AuthContext
//this.context-en keresztül elérhető a user


