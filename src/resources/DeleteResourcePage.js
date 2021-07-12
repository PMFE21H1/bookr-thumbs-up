
import React from "react"
import {listReservations} from "../reservations/reservations";

export default class DeleteResourcePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            resourceId:this.props.match.params.resourceID,
            reservations:[],
        }
    }
    componentDidMount() {

        //lekérem az összes reservation adatát, hogy ki tudjam írni a relevánsakat
        listReservations().then(reservations=>this.setState({
            reservations:reservations
        }))

    }

    render(){
        return(
            <div>
                <p>Are you sure you want to delete the resource along with the following reservations?</p>
                {this.state.reservations.map(reservation=> {
                    if(reservation.resource===this.state.resourceId){
                        return(<div><p>{reservation.name}, {reservation.slot}</p></div>)
                    }
                })}
                <button onClick={()=>deleteResource(this.state.resourceId)}>Delete</button>
                {/*<Link to={"admin/resources"}></Link>*/}

            </div>
        )
    }
}

