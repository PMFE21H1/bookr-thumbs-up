import { listReservations } from "./reservations/reservations";
import React from 'react'



function App() {

  return (
    <div>
      <button onClick={() => listReservations().then(reservations => console.log(reservations))}>Get Reservations</button>
    </div>
  );
}

export default App;
