import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'


function App() {
  return (
      <>
      <Router>
        <Switch>

          <Route path="/login">
              <LoginPage/>
          </Route>

                {/* RESOURCES */}

          <Route path="/admin/resource/:id/edit">
              <EditResourcePage/>
          </Route>

          <Route path="/admin/resource/:id/delete">
              <DeleteResourcePage/>
          </Route>

          <Route path="/admin/resource/create">
              <CreateResourcePage/>
          </Route>

          <Route path="/admin/resource">
              <ListResourcesPage/>
          </Route>

                {/* RESERVATIONS */}

          <Route path="/admin/reservations/:id/edit">
              <EditReservationPage/>
          </Route>

          <Route path="/admin/reservations/:id/delete">
              <DeleteReservationPage/>
          </Route>

          <Route path="/admin/reservations/create">
              <CreateReservationPage/>
          </Route>

          <Route path="/admin/reservations">
              <ListReservationsPage/>
          </Route>

                {/* HOME PAGE */}

          <Route path="/admin">
              <HomePage/>
          </Route>

        </Switch>
      </Router>

        

      </>
  );
}

export default App;