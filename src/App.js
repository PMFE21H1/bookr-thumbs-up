import React from "react";
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";
import CreateResourcePage from "./resources/CreateResourcePage";
import ListReservationsPage from "./reservations/listReservationsPage";
import ListResourcesAdminPage from "./resources/ListResourcesAdminPage";
import DeleteReservationPage from "./reservations/DeleteReservationPage";
import DeleteResourcePage from "./resources/DeleteResourcePage";
import UpdateReservationPage from "./reservations/UpdateReservationPage";
import {UpdateResourcePage} from "./resources/UpdateResourcePage";
import CreateReservationPage from "./reservations/CreateReservationPage";
import LoginPage from "./authentication/LoginPage";


let AuthContext = React.createContext(null)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
        }
    }

    logIn = (user) => {
        this.setState({
            user: user
        })
        console.log(user)
        console.log(this.state)
    }

    render() {
        return (
            <Router>
                <AuthContext.Provider value={{user: this.state.user}}>
                    <Switch>

                        <Route path="/login"><LoginPage onLogIn={this.logIn}/></Route>
                        <PrivateRoute
                            path="/admin/resources/create"
                            render={(props) => (<CreateResourcePage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/resources"
                            render={(props) => (<ListResourcesAdminPage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/resource/:resourceID/delete"
                            render={(props) => (<DeleteResourcePage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/resource/:resourceID/edit"
                            render={(props) => (<UpdateResourcePage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/create"
                            render={(props) => (<CreateReservationPage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/:reservationID/delete"
                            render={(props) => (<DeleteReservationPage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations/:reservationID/edit"
                            render={(props) => (<UpdateReservationPage {...props}/>)}>
                        </PrivateRoute>

                        <PrivateRoute
                            path="/admin/reservations"
                            render={(props) => (<ListReservationsPage {...props}/>)}>
                        </PrivateRoute>

                    </Switch>
                    <Link to="/admin/resources">Resources</Link>
                    <Link to="/admin/reservations">Reservations</Link>
                </AuthContext.Provider>
            </Router>
        );
    }

}

let PrivateRoute = ({render, ...props}) => {
    return (
        <AuthContext.Consumer>
            {({user, ...rest}) => {
                return <Route {...props}
                              render={() => (user ? render : <Redirect to="/login" />)}/>
            }}
        </AuthContext.Consumer>
    )
}

export default App;
