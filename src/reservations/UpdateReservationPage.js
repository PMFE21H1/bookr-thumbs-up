import React from "react";
import { getAuth } from "firebase/auth";
import { createResource } from "../resources/resources";
import { Route, Link } from "react-router-dom";
import { updateReservation } from './reservations'

export default class UpdateReservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationID: this.props.match.params.reservationID,
      reservationData: {},
    };
  }
  componentDidMount = () => {
    return fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.state.reservationID}.json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((reservation) => {
        this.setState({
          reservationData: {
            name: reservation.customer,
            date: reservation.slot.split("T")[0],
            time: reservation.slot.split("T")[1],
          },
        });
      });
  };
  handleName = (e) => {
    this.setState({
      reservationData: {...this.state.reservationData, name: e.target.value}
    });

  };
  handleDate = (e) => {
    this.setState({
      reservationData: {...this.state.reservationData, date: e.target.value}
    });

  };
  handleTime = (e) => {
    this.setState({
      reservationData: {...this.state.reservationData, time: e.target.value}
    });

  };
  render() {
    return (
      <div>
        <form>
          <h3>Update reservation</h3>

          <p>Resource</p>

          <p>Update name</p>
          <input
            type="text"
            placeholder={this.state.reservationData.name}
            value={this.state.updatedName}
            onChange={this.handleName}
          />

          <p>Update date</p>
          <input
            type="date"
            value={this.state.reservationData.date}
            onChange={this.handleDate}
          />

          <p>Update time</p>
          <p></p>
          <input
            type="time"
            value={this.state.reservationData.time}
            onChange={this.handleTime}
          />
        </form>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              try {
                updateReservation(this.state.reservationID, 
                  {customer: this.state.reservationData.name,
                     slot: this.state.reservationData.date + 'T' + this.state.reservationData.time})
                     .then(()=>this.props.history.push('/admin/reservations'))
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            Apply
          </button>
          <Link to='/admin/reservations'>Cancel</Link>
        </div>
      </div>
    );
  }
}
