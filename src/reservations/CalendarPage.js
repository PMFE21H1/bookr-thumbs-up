import React from "react";
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
    fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
            .then(response=>response.json())
            .then(slotConfig => listReservations()
                                  .then(reservations => reservations.filter(r => r.resource == this.props.resourceId) )
                                  .then(filteredReservations => this.setState({reservations: filteredReservations, slotConfig: slotConfig })))
  }
  
  render() {
    // amíg nincs slotConfig, nem tudjuk megjeleníteni a calendart
    if (!this.state.slotConfig) return null;
    return <Calendar reservations={this.state.reservations} slotStart={this.state.slotConfig.start} slotEnd={this.state.slotConfig.end} slotDuration={this.state.slotConfig.duration} />
  }
}