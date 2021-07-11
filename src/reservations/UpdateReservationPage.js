import React from "react";
import { getAuth } from "firebase/auth";
import { createResource } from "../resources/resources";
import { Route, Link } from "react-router-dom";

export default class UpdateReservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationId: "",
      reservationData: {},
    };
  }
  componentDidMount = () => {
    return fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/-Me6TAh_EzgldyUnWuRM.json`,
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
      ...this.state.reservationData,
      name: e.target.value,
    });
    console.log(e);
  };
  handleDate = (e) => {
    this.setState({
      ...this.state.reservationData,
      date: e.target.value,
    });
    console.log(e);
  };
  handleTime = (e) => {
    this.setState({
      ...this.state.reservationData,
      time: e.target.value,
    });
    console.log(e);
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
                // updatedReservation(this.state.reservationId, {customer: this.state.reservationData.name, slot: this.state.reservationData.date + 'T' + this.state.reservationData.time})
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            Apply
          </button>
          <button>Cancel</button>
          {/* <Link to='/admin/reservations'>Cancel</Link> */}
        </div>
      </div>
    );
  }
}
