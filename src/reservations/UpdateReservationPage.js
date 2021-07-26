import React from "react";
import {getAuth} from "firebase/auth";
import {createResource, listResources} from "../resources/resources";
import {Route, Link} from "react-router-dom";
import {updateReservation} from './reservations'
import SlotSelector from "./SlotSelector";
import UserSelector from "./UserSelector";
import {UsersDatabaseContext} from "../App";
import {TaxonomyContext} from "../context/context";
import { Col, Container, Row, Form, Button, Nav } from "react-bootstrap";

export default class UpdateReservationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //itt olvassuk ki az id-t az url-bol
            reservationID: this.props.match.params.reservationID,
            reservationData: {},
            resources: [],
        };
    }
    // fetchelunk az url-bol kiolvasott id alapjan egy reservationt
    componentDidMount = () => {
        return fetch(
            `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.state.reservationID}.json`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((reservation) => {
                console.log(reservation)
                //a lekert reservation adatait setStateljuk es beleirjuk a reservationDatankba.
                this.setState({
                    reservationData: {
                        customerUid: reservation.customerUid,
                        resource: reservation.resource,
                        //mivel a slot magaba foglalja a datet es a timeot ezert a split hasznalataval szetszedtuk azokat
                        date: reservation.slot.split("T")[0],
                        time: reservation.slot.split("T")[1],
                    },
                });
            })
            .then(() => {
                listResources().then(resourcesArr => resourcesArr.map(
                    resource => {
                        this.setState(() => {
                            return {resources: [...this.state.resources, resource]}
                        })
                    }
                ))
            });

    };

    handleName = (newUserUid) => {
        this.setState({
            reservationData: {...this.state.reservationData, customerUid: newUserUid}
        });

    };

    changeResource = (e) => {
        this.state.resources.forEach(resource => {
            if (resource.id === e.target.value) {
                this.setState({resource: resource.id})
            }
        })
        console.log(this.state)
    }
    changeSlot = (date, time) => {
        this.setState({reservationData: {...this.state.reservationData, date: date, time: time}})
        console.log(this.state)
    }



  render() {
    return (
      <TaxonomyContext.Consumer>
                {(taxonomy) => {
                    return (<>
        <Container>
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg"
            >
              <Form>
                <h3 className="shadow-sm tect-success mt-5 p-3 text-center rounded">
                  Update reservation
                </h3>
                <Nav className="justify-content-center mt-2">

                   <select
                  onChange={(e) => this.changeResource(e)}
                  value={this.state.resource}
                >
                  <option value={null}>Select a {taxonomy.resource}</option>

                  {this.state.resources !== []
                    ? this.state.resources.map((resource) => (
                        <option key={resource.id} value={resource.id}>
                          {resource.name}
                        </option>
                      ))
                    : ""}
                </select>
                </Nav>
               
                <Nav className="justify-content-center mt-2">
                  <p>Update name</p>
                </Nav>
                <Nav className="justify-content-center">
 <UserSelector onHandleName={this.handleName} /></Nav>
 <Nav className="justify-content-center mt-2">
    <SlotSelector
                  resource={this.state.resource}
                  changeSlot={this.changeSlot}
                ></SlotSelector>
 </Nav>
               

                
               

                <div>
                <Nav className="justify-content-center mt-2">
                  <Nav className="mr-2">
                    <Button
                    onClick={(e) => {
                      e.preventDefault();
                      try {
                        updateReservation(
                          this.state.reservationID,
                          {
                            customerUid: this.state.reservationData.customerUid,
                            slot:
                              this.state.reservationData.date +
                              "T" +
                              this.state.reservationData.time,
                            resource: this.state.resource,
                          }
                        ).then(() =>
                          this.props.history.push("/admin/reservations")
                        );
                      } catch (e) {
                        alert(e.message);
                      }
                    }}
                  >
                    Apply
                  </Button>
                  </Nav>
                  
                  <Link to="/admin/reservations">
                    <Button variant="danger">Cancel</Button>
                  </Link>
                </Nav>
                  
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </> )
      }}
    </TaxonomyContext.Consumer>
    );
  }
}