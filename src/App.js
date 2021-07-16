import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateResourcePage from "./resources/CreateResourcePage";
import ListReservationsPage from "./reservations/listReservationsPage";
import ListResourcesAdminPage from "./resources/ListResourcesAdminPage";
import DeleteReservationPage from "./reservations/DeleteReservationPage";
import DeleteResourcePage from "./resources/DeleteResourcePage";
import UpdateReservationPage from "./reservations/UpdateReservationPage";
import { UpdateResourcePage } from "./resources/UpdateResourcePage";
import CreateReservationPage from "./reservations/CreateReservationPage";
import LoginPage from "./authentication/LoginPage";
import RegistrationPage from "./authentication/RegistrationPage";

let AuthContext = React.createContext(null);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
  }

  logIn = (user, callback) => {
    this.setState({
      user: user,
    }, callback());
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider value={{ user: this.state.user }}>
        <Link to="/admin/resources">Resources</Link>
        <Link to="/admin/reservations">Reservations</Link>
        <Link to="/login">Log In</Link>
        <Link to="/registration">Registration</Link>

          <Switch>
              
            <Route path="/registration">
              <RegistrationPage onLogIn={this.logIn} />
            </Route>

            <Route path="/login" render={(props) => <LoginPage onLogIn={this.logIn} {...props}/>}/>

            <PrivateRoute
              path="/admin/resources/create"
              render={(props) => <CreateResourcePage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/resources"
              render={(props) => <ListResourcesAdminPage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/resource/:resourceID/delete"
              render={(props) => <DeleteResourcePage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/resource/:resourceID/edit"
              render={(props) => <UpdateResourcePage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/reservations/create"
              render={(props) => <CreateReservationPage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/reservations/:reservationID/delete"
              render={(props) => <DeleteReservationPage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/reservations/:reservationID/edit"
              render={(props) => <UpdateReservationPage {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              path="/admin/reservations"
              render={(props) => <ListReservationsPage {...props} />}
            ></PrivateRoute>
          </Switch>

        </AuthContext.Provider>
      </Router>
    );
  }
}

let PrivateRoute = ({ render, ...props }) => {
  return (
    <AuthContext.Consumer>
      {({ user, ...rest }) => {
        return (
          <Route
            {...props}
            render={(props) =>{
              user ?
              render(props)
              : 
              <Redirect to="/login" />
            }}
          />
        );
      }}
    </AuthContext.Consumer>
  );
};

export default App;
