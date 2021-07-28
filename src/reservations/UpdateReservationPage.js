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
import Swal from "sweetalert2";

export default class UpdateReservationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationID: this.props.match.params.reservationID,
            reservationData: {},
            resources: [],
        };
    }

    componentDidMount = () => {
        return fetch(
            `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.state.reservationID}.json`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((reservation) => {
                this.setState({
                    reservationData: {
                        customerUid: reservation.customerUid,
                        resource: reservation.resource,
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
    }

    changeSlot = (date, time) => {
        this.setState({reservationData: {...this.state.reservationData, date: date, time: time}})
        
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
                        <option key={resource.id}  value={resource.id}  >
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
                        Swal.fire({
                          title: "Failed to made a reservation!",
                          text: `${e.message}`,
                          icon: "error",
                          confirmButtonText:"OK"});
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