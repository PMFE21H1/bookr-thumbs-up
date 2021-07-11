import { listReservations } from "../reservations/reservations";
import React from "react";

function TestListReservations() {
  return (
    <div>
      <button
        onClick={() =>
          listReservations().then((reservations) =>
            console.log(
              Object.keys(reservations).map((key) => {
                return reservations[key];
              })
            )
          )
        }
      >
        Get Reservations
      </button>
    </div>
  );
}
export default TestListReservations;
