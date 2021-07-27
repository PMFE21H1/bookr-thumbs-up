import React from "react";
import Calendar from "./Calendar";
import { calcWeekStart } from "./dates";
import { listReservations } from "./reservations";

export default class CalendarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        startDay: calcWeekStart(),
        slotArr: []
    }
  }
  
  componentDidMount() {
    fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
            .then(response=>response.json())
            .then(slotConfig=>{
                listReservations().then(reservations => reservations.filter(r => r.resource == this.props.resourceId) )
                    .then(filteredReservations => {
                        let generatedSlotArr=[];
                        let timeSlotter = require('time-slotter');
                        timeSlotter(slotConfig.start, slotConfig.end, parseInt(slotConfig.duration))
                            .forEach(slotArr=>{
                                let slot=`${slotArr[0]}-${slotArr[1]}`
                                generatedSlotArr.push(slot);
                                console.log(slotArr[0])
                            })
                        this.setState({slotArr:generatedSlotArr , reservations: filteredReservations })
                    })

                }
            ).then(()=>console.log(this.state.slotArr))
  }
  
  render() {
    return <Calendar slotArr={this.state.slotArr} reservations={this.state.reservations} resourceId ="-Mf730Rkc7khOjLlePci"  />
  }
}