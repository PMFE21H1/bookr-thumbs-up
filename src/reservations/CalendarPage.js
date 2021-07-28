import React from "react";
import { listResources } from "../resources/resources";
import Calendar from "./Calendar/Calendar";
import { calcWeekStart } from "./dates";
import { listReservations } from "./reservations";

export default class CalendarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        startDay: calcWeekStart(),
        slotConfig: null
    }
  }
  
  componentDidMount() {
    listResources().then(resources => {
      fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
              .then(response=>response.json())
              .then(slotConfig => listReservations()
                                    .then(reservationsData => {
                                      let reservations = {};
                                      Object.keys(reservationsData).forEach(key => {
                                        if(reservations[reservationsData[key].resource]) reservations[reservationsData[key].resource].push(reservationsData[key])
                                        else reservations[key] = [];
                                      })
                                      this.setState({
                                        reservations: reservations,
                                        slotConfig: slotConfig,
                                        resources: resources
                                      })
                                    }))})
  }
  
  render() {
    // amíg nincs slotConfig, nem tudjuk megjeleníteni a calendart
    if (!this.state.slotConfig) return null;

    return (this.state.resources.map(resource => (
      <>
        <h1>{resource.name}</h1>
        <Calendar
          reservations={this.state.reservations[resource.id]}
          slotStart={this.state.slotConfig.start}
          slotEnd={this.state.slotConfig.end}
          slotDuration={this.state.slotConfig.duration} />
      </>
    )));
  }
}