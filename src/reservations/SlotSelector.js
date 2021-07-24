import React from "react"
import {listReservations} from "./reservations";

export default class SlotSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            date:"",
            time:"",
            slotOptions:[],
            slotArr:[]

        }
    }
    componentDidMount() {
        fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
            .then(response=>response.json())
            .then(slotConfig=>{
                let generatedSlotArr=[];
                let timeSlotter = require('time-slotter');
                timeSlotter(slotConfig.start, slotConfig.end, parseInt(slotConfig.duration))
                    .forEach(slotArr=>{
                    let slot=`${slotArr[0]}-${slotArr[1]}`
                        generatedSlotArr.push(slot);
                })
                this.setState({slotArr:generatedSlotArr})
            }
        ).then(()=>console.log(this.state.slotArr))


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.date!==this.state.date||prevProps.resource!==this.props.resource){
            this.setState(()=>{return{slotOptions:[]}})
            listReservations().
            then(reservationsArray=>
                reservationsArray.filter(reservation=>
                    reservation.slot.split("T")[0]===this.state.date&&reservation.resource===this.props.resource))
                .then(reservedSlots=>this.state.slotArr.forEach(slot=>{
                    let reserved=false;
                    reservedSlots.forEach(reservation=>{
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