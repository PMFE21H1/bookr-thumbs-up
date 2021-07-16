import React from "react"
import {listReservations} from "./reservations";

export default class SlotSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            date:"",
            time:"",
            slotArr:["08:00-09:00","09:00-10:00", "10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00"],
            slotOptions:[],

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.date!==this.state.date||prevProps.resource!==this.props.resource){
            this.setState(()=>{return{slotOptions:[]}})
            listReservations().
            then(reservationsArray=>
                reservationsArray.filter(reservation=>
                    reservation.slot.split("T")[0]===this.state.date&&reservation.resource===this.props.resource))
                .then(data=>this.state.slotArr.forEach(slot=>{
                    let reserved=false;
                    data.forEach(reservation=>{
                        if(slot.split('-')[0]===reservation.slot.split('T')[1]){
                            this.setState({slotOptions:[...this.state.slotOptions, 'Reserved']})
                            reserved=true;
                        }

                    })
                    if(!reserved){
                        this.setState({slotOptions:[...this.state.slotOptions, slot]})
                    }
                }))
                .then(()=>console.log(this.state.slotOptions))
        }
        if(prevState.date!==this.state.date||prevState.time!==this.state.time){
            this.props.changeSlot(this.state.date,this.state.time)
        }

    }

    updateDate=(e)=>{
        this.setState(()=>{return{date:e.target.value}})
    }
    updateTime=(e)=>{
        this.setState(()=>{return{time:e.target.value.split('-')[0]}})
    }
    render(){
        return(
                <div>
                    <input onChange={(e)=>this.updateDate(e)} type="date"/>
                    <select onChange={(e)=>this.updateTime(e)} name="Time" id="">
                        <option value="">Select time</option>
                        {this.state.slotOptions.map(slot=>(slot==="Reserved")? <option   value={slot} disabled>{slot}</option>: <option value={slot}>{slot}</option>)}
                    </select>
                </div>
        )
    }
}