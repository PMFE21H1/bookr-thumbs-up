import {BrowserRouter as Router,Link,Switch,Route} from "react-router-dom";
import CreateResourcePage from "./resources/CreateResourcePage";
import ListReservationsPage from "./reservations/listReservationsPage";
import ListResourcesAdminPage from "./resources/ListResourcesAdminPage";
import DeleteReservationPage from "./reservations/DeleteReservationPage";
import {UpdateResourcePage} from "./resources/UpdateResourcePage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin/resources/create">
                    <CreateResourcePage/>
                </Route>
                <Route path="/admin/resources">
                    <ListResourcesAdminPage/>
                </Route>
                <Route path="/admin/resource/:resourceID/edit" render={(props)=>(<UpdateResourcePage {...props}/>)}>
                </Route>
                {/*<Route path="/admin/reservations/create" exact><ReservationPage/></Route>*/}
                <Route path="/admin/reservations/:reservationID/delete" render={(props)=>(<DeleteReservationPage {...props}/>)}>
                </Route>
                <Route path="/admin/reservations" exact><ListReservationsPage/></Route>
            </Switch>
            <Link to="/admin/resources">Resources</Link>
            <Link to="/admin/reservations">Reservations</Link>
        </Router>
    );
}

export default App;
