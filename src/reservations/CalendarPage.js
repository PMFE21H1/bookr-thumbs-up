import React from "react";
import Calendar from "./Calendar";
import { calcWeekStart } from "./dates";
import { listReservations } from "./reservations";

export default class CalendarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        startDay: calcWeekStart(),
        slotArr: [],
        slotConfig: null
    }
  }
  
  componentDidMount() {
    fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
            .then(response=>response.json())
            .then(slotConfig => {
                listReservations().then(reservations => reservations.filter(r => r.resource == this.props.resourceId) )
                    .then(filteredReservations => {
                        let generatedSlotArr=[];
                        let timeSlotter = require('time-slotter');
                        timeSlotter(slotConfig.start, slotConfig.end, parseInt(slotConfig.duration))
                            .forEach(slotArr=>{
                                // FIGYELEM:
                                // csak a kezdő időpontot pusholjuk, hogy egységes lehessen a calendar prop api
                                // - a calendaron belülre került a timeslotteres kiegészítés másik fele
                                // - így a többi csapat timeslotter nélkül is fel tudja használni a komponenst, mivel a
                                //   bemenő adatok nem timeslotterspecifikus formátumban vannak
                                generatedSlotArr.push(slotArr[0]);
                            })
                        this.setState({slotArr:generatedSlotArr , reservations: filteredReservations, slotConfig: slotConfig })
                    })

                }
            ).then(()=>console.log(this.state.slotArr))
  }
  
  render() {
    // amíg nincs slotConfig, nem tudjuk megjeleníteni a calendart
    if (!this.state.slotConfig) return null;
    return <Calendar slotArr={this.state.slotArr} reservations={this.state.reservations} resourceId ="-Mf730Rkc7khOjLlePci" slotStart={this.state.slotConfig.start} slotEnd={this.state.slotConfig.end} slotDuration={this.state.slotConfig.duration} />
  }
}