import React, { useEffect, useState } from "react";
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

export default function SlotSelector(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slotOptions, setSlotOptions] = useState([]);
  const [slotArr, setSlotArr] = useState([]);
  const [slotOptionsFinal, setSlotOptionsFinal] = useState([]);

  useEffect(() => {
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
        setSlotArr(generatedSlotArr);
      })
  }, []);

  function markReservedSlots(relevantReservations) {
    console.log(relevantReservations);
    slotArr.forEach((slot) => {
      let foundReserved = false;
      console.log(relevantReservations)
      relevantReservations.forEach((reservation) => {
        let isReserved = slot.split("-")[0] === reservation.slot.split("T")[1];
        console.log(slotOptions)
        if (isReserved) {
          setSlotOptions(prevSlotOptions => [...prevSlotOptions, "Reserved"])
          
          foundReserved = true;
        }
      });
      if (!foundReserved) {
        console.log(slotOptions)
        setSlotOptions(prevSlotOptions => [...prevSlotOptions, slot]);
      }
    });
    console.log(slotOptions);
  };

  useEffect(() => {

    setSlotOptions([]);
    listReservations()
      .then((reservationsArray) =>
        reservationsArray.filter(
          (reservation) =>
            reservation.slot.split("T")[0] === date &&
            reservation.resource === props.resource
        )
      )
      .then(markReservedSlots)
      .then(() => setSlotOptionsFinal([]))
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
            unavailableSlot.slot.split("T")[0] === date &&
            unavailableSlot.resourceId === props.resource
        )
      )
      .then((relevantUnavailableSlots) =>
        {
          console.log(slotOptions)
        slotOptions.forEach((slot) => {
          let unavailable = false;
          relevantUnavailableSlots.forEach((ruSlot) => {
            if (slot.split("-")[0] === ruSlot.slot.split("T")[1]) {
              setSlotOptionsFinal(prevSlotOptionsFinal => [
                ...prevSlotOptionsFinal,
                "Unavailable",
              ]);
              unavailable = true;
            }
          });
          if (!unavailable) {
            
              setSlotOptionsFinal(prevSlotOptionsFinal => [...prevSlotOptionsFinal, slot])
            
          }
        })
      }
      );
  }, [date, props.resource]
  );

  useEffect(() => {
    props.changeSlot(date, time);
  }, [date, time]);

  function updateDate(e) {
    setDate(e.target.value);
  };

  function updateTime(e) {
    setTime(e.target.value.split("-")[0]);
  };

  return (
    <div>
        <Form>
          <Form.Group>
            <Form.Control className="mt-2 mb-3"
              onChange={(e) => updateDate(e)}
              type="date"
            ></Form.Control>
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => updateTime(e)}
            name="Time"
            id=""
          >
            <option value="">Select time</option>
            {slotOptionsFinal.map((slot) =>
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
  )
}