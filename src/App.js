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
import {UpdateResourcePage} from "./resources/UpdateResourcePage";
import CreateReservationPage from "./reservations/CreateReservationPage";
import LoginPage from "./authentication/LoginPage";
import RegistrationPage from "./authentication/RegistrationPage";
import ReservationDetailsPage from "./reservations/ReservationDetailsPage";
import RequestReservationPage from "./reservations/RequestReservationPage";
import PublicResourcesPage from "./resources/PublicResourcesPage";
import MyReservationsPage from "./reservations/MyReservationsPage";


export let AuthContext = React.createContext(null)


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

        }, callback);
    }


    render() {
        return (

            <Router>
                <AuthContext.Provider value={{user: this.state.user}}>
                    <Link to="/admin/resources">Resources</Link>
                    <Link to="/resources"> Public Resources</Link>
                    <Link to="/admin/reservations">Reservations</Link>
                    <Link to="/login">Log In</Link>
                    <Link to="/registration">Registration</Link>

                    <Switch>

                        <Route path="/registration">
                            <RegistrationPage onLogIn={this.logIn}/>
                        </Route>

                        <PrivateRoute
                            path="/resources/:resourceID/request-reservation"
                            render={(props) => <RequestReservationPage {...props} />}
                        />

                        <PrivateRoute
                            path="/my-reservations"
                            render={(props) => <MyReservationsPage {...props} />}
                        />

                        <Route path="/resources">
                            <PublicResourcesPage/>
                        </Route>

                        <Route path="/login" render={(props) => <LoginPage onLogIn={this.logIn} {...props}/>}/>

                        <PrivateRoute
                            path="/admin/resources/create"
                            admin={true}
                            render={(props) => <CreateResourcePage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/resources"
                            admin={true}
                            render={(props) => <ListResourcesAdminPage {...props} />}
                        ></PrivateRoute>



                        <PrivateRoute
                            path="/admin/resource/:resourceID/delete"
                            admin={true}
                            render={(props) => <DeleteResourcePage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/resource/:resourceID/edit"
                            admin={true}
                            render={(props) => <UpdateResourcePage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/create"
                            admin={true}
                            render={(props) => <CreateReservationPage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/:reservationID/delete"
                            admin={true}
                            render={(props) => <DeleteReservationPage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/:reservationID/edit"
                            admin={true}
                            render={(props) => <UpdateReservationPage {...props} />}
                        ></PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/:reservationID"
                            admin={true}
                            render={(props) => <ReservationDetailsPage {...props} />}
                        ></PrivateRoute>
                        <PrivateRoute
                            path="/admin/reservations"
                            admin={true}
                            render={(props) => <ListReservationsPage {...props} />}
                        ></PrivateRoute>

                    </Switch>

                </AuthContext.Provider>
            </Router>
        );
    }

}

let PrivateRoute = ({render, ...routeProps}) => {
    return (
        <AuthContext.Consumer>
            {({user, ...rest}) => {
                return (
                    <Route
                        {...routeProps}
                        render={(props) => {
                            if (!user) {
                                return <Redirect to="/login"/>
                            }

                            if (routeProps.admin) {

                                if (user.admin) {
                                    return render(props)
                                }
                                return <h1>Unauthorized</h1>
                            }

                            return render(props)


                        }}
                    />
                );
            }}
        </AuthContext.Consumer>
    );
};

export default App;
