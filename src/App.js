import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {AuthContext, UsersDatabaseContext,TaxonomyContext} from "./context/context"

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
import ReservationDetailsPage from "./reservations/ReservationDetailsPage";
import { listUsersFromDatabase } from "./authentication/authentication";
import RequestReservationPage from "./reservations/RequestReservationPage";
import PublicResourcesPage from "./resources/PublicResourcesPage";
import UnauthorizedPage from "./authentication/UnauthorizedPage";
import MyReservationsPage from "./reservations/MyReservationsPage";
import ResourceTaxonomy from "./resources/ResourceTaxonomy";
import ConfigPage from "./authentication/ConfigPage";
import Header from "./authentication/Header";
import UploadFile from "./resources/UploadFile";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import SlotConfig from "./reservations/SlotConfig";
import UnavailableSlots from "./reservations/UnavailableSlots";
import HomePage from "./authentication/HomePage";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            usersFromDatabase: [],
            authChecked: false,
            taxonomy: {
                resource: "",
                resources: "",
                url: ""
            }

        };
    }


    logIn = (user, callback) => {

        this.setState({
            user: user
        }, callback);
    }


    componentDidMount() {

        listUsersFromDatabase()
        .then((users) => {
            this.setState({usersFromDatabase: users});
            onAuthStateChanged(
                getAuth(),
                user => this.setState({
                    authChecked: true,
                    user: users.find((u) =>  u.uid === user?.uid)  //optional chaining operator
                })
            );
        });





        fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/taxonomy.json`).then(response => response.json())
            .then(
                taxonomy => this.setState({
                    taxonomy: {
                        resource: taxonomy.resource,
                        resources: taxonomy.resources,
                        url: taxonomy.url
                    }
                })
            )

        listUsersFromDatabase()
            .then((users) => this.setState({usersFromDatabase: users}))
    }


    taxonomyChange = (resource, resources, url) => {
        this.setState(() => ({
            taxonomy: {resource: resource, resources: resources, url: url}
        }))
    }

    render() {
        if (!this.state.authChecked) return <p>loading...</p>

        return (
            <Router>
                <TaxonomyContext.Provider value ={this.state.taxonomy}>
                        <AuthContext.Provider value={{user: this.state.user}}>

                            <Header />

                    <UsersDatabaseContext.Provider value={this.state.usersFromDatabase}>
                        <Switch>


                            <Route path="/registration">
                                <RegistrationPage onLogIn={this.logIn}/>
                            </Route>

                            <Route path="/unauthorized">
                                <UnauthorizedPage />
                            </Route>

                            <PrivateRoute
                                admin={true}
                                path="/admin/config/slot/availability"
                                render={(props) => <UnavailableSlots {...props} />}
                            />

                           <PrivateRoute
                                  admin={true}
                                   path="/admin/config/slot"
                                   render={(props) => <SlotConfig {...props} />}
                                        />


                            <PrivateRoute
                                path="/resources/:resourceID/request-reservation"
                                render={(props) => <RequestReservationPage {...props} />}
                            ></PrivateRoute>



                            <Route path={`/${this.state.taxonomy.resources}`}>

                                <PublicResourcesPage/>
                            </Route>

                            <Route path="/login" render={(props) => <LoginPage onLogIn={this.logIn} {...props}/>}/>

                            <PrivateRoute


                                path={`/admin/config/${this.state.taxonomy.resources}/create`}

                                admin={true}
                                render={(props) => <CreateResourcePage {...props} />}
                            ></PrivateRoute>




                            <PrivateRoute
                                path="/my-reservations/:reservationID"
                                render={(props) => <ReservationDetailsPage {...props} />}
                            ></PrivateRoute>

                            <PrivateRoute
                                path="/my-reservations"
                                render={(props) => <MyReservationsPage {...props} />}
                            />

                            <PrivateRoute

                                path={`/admin/config/${this.state.taxonomy.resources}/:resourceID/delete`}
                                admin={true}
                                render={(props) => <DeleteResourcePage {...props} />}
                            ></PrivateRoute>

                            <PrivateRoute
                                path={`/admin/config/${this.state.taxonomy.resources}/:resourceID/edit`}
                                admin={true}
                                render={(props) => <UpdateResourcePage {...props} />}
                            ></PrivateRoute>

                            <PrivateRoute
                                path={`/admin/config/${this.state.taxonomy.resources}`}
                                admin={true}
                                render={(props) => <ListResourcesAdminPage {...props} />}

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

                            <PrivateRoute
                                path= "/admin/config/resources/taxonomy"
                                admin ={true}
                                render={(props) => <ResourceTaxonomy taxonomyChange = {this.taxonomyChange}{...props}/>}
                            ></PrivateRoute>

                            <PrivateRoute
                                path="/admin/config"
                                admin={true}
                                render={(props) => <ConfigPage {...props} />}

                            ></PrivateRoute>
                            <Route path="/">
                                <HomePage/>
                            </Route>

                        </Switch>
                    </UsersDatabaseContext.Provider>
                </AuthContext.Provider>

                </TaxonomyContext.Provider>
            </Router>
        );
    }


}

let PrivateRoute = ({ render, ...routeProps }) => {
  return (
    <AuthContext.Consumer>
      {({ user, ...rest }) => {
        return (
          <Route
            {...routeProps}
            render={(props) => {
              if (!user) {
                return <Redirect to="/login" />;
              }

              if (routeProps.admin) {
                if (user.admin) {
                  return render(props);
                }
                return <Redirect to="/unauthorized" />;
              }

              return render(props);
            }}
          />
        );
      }}
    </AuthContext.Consumer>
  );
};

export default App;
