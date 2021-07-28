import React from "react";
import { listReservations } from "./reservations";
import {
  Form,
  Container,
  Row,
  Col,
  Nav,
  Button,
  Dropdown,
} from "react-bootstrap";


export default class SlotSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      slotOptions: [],
      slotArr: [],
      slotOptionsFinal: [],
    };
  }
  componentDidMount() {
    fetch(
      "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json"
    )
      .then((response) => response.json())
      .then((slotConfig) => {
        let generatedSlotArr = [];
        let timeSlotter = require("time-slotter");
        timeSlotter(
          slotConfig.start,
          slotConfig.end,
          parseInt(slotConfig.duration)
        ).forEach((slotArr) => {
          let slot = `${slotArr[0]}-${slotArr[1]}`;
          generatedSlotArr.push(slot);
        });
        this.setState({ slotArr: generatedSlotArr });
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.date !== this.state.date ||
      prevProps.resource !== this.props.resource
    ) {
      this.setState(() => {
        return { slotOptions: [] };
      });
      listReservations()
        .then((reservationsArray) =>
          reservationsArray.filter(
            (reservation) =>
              reservation.slot.split("T")[0] === this.state.date &&
              reservation.resource === this.props.resource
          )
        )
        .then(this.markReservedSlots)
        .then(() => this.setState({ slotOptionsFinal: [] }))
        .then(() =>
          fetch(
            "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/unavailableSlots.json"
          )
        )
        .then((response) => response.json())
        .then((unavailableSlotsObj) => {
          return Object.keys(unavailableSlotsObj).map((key) => {
            return unavailableSlotsObj[key];
          });
        })
        .then((unavailableSlots) =>
          unavailableSlots.filter(
            (unavailableSlot) =>
              unavailableSlot.slot.split("T")[0] === this.state.date &&
              unavailableSlot.resourceId === this.props.resource
          )
        )
        .then((relevantUnavailableSlots) =>
          this.state.slotOptions.forEach((slot) => {
            let unavailable = false;
            relevantUnavailableSlots.forEach((ruSlot) => {
              if (slot.split("-")[0] === ruSlot.slot.split("T")[1]) {
                this.setState({
                  slotOptionsFinal: [
                    ...this.state.slotOptionsFinal,
                    "Unavailable",
                  ],
                });
                unavailable = true;
              }
            });
            if (!unavailable) {
              this.setState({
                slotOptionsFinal: [...this.state.slotOptionsFinal, slot],
              });
            }
          })
        );
    }

    if (
      prevState.date !== this.state.date ||
      prevState.time !== this.state.time
    ) {
      this.props.changeSlot(this.state.date, this.state.time);
    }
  }
  markReservedSlots = (relevantReservations) => {
    this.state.slotArr.forEach((slot) => {
      let foundReserved = false;
      relevantReservations.forEach((reservation) => {
        let isReserved = slot.split("-")[0] === reservation.slot.split("T")[1];
        if (isReserved) {
          this.setState({
            slotOptions: [...this.state.slotOptions, "Reserved"],
          });
          foundReserved = true;
        }
      });
      if (!foundReserved) {
        this.setState({ slotOptions: [...this.state.slotOptions, slot] });
      }
    });
  };

  updateDate = (e) => {
    this.setState(() => {
      return { date: e.target.value };
    });
  };
  updateTime = (e) => {
    this.setState(() => {
      return { time: e.target.value.split("-")[0] };
    });
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Control className="mt-2 mb-3"
              onChange={(e) => this.updateDate(e)}
              type="date"
            ></Form.Control>
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => this.updateTime(e)}
            name="Time"
            id=""
          >
            <option value="">Select time</option>
            {this.state.slotOptionsFinal.map((slot) =>
              slot === "Reserved" || slot === "Unavailable" ? (
                <option value={slot} disabled>
                  {slot}
                </option>
              ) : (
                <option value={slot}>{slot}</option>
              )
            )}
          </Form.Select>
        </Form>
      </div>
    );
  }
}