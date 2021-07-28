import React, { Component } from "react";
import SlotSelector from "./SlotSelector";
import {createReservation, listReservations, Reservation} from "./reservations";
import {AuthContext, UsersDatabaseContext} from "../context/context"
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import { Form, Container, Row, Col, Nav, Button } from "react-bootstrap";
import "./requestReservationPage.css"

export default class RequestReservationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        listReservations()
            .then((reservations) => this.setState({
                    reservations: reservations
                })
            )
    }
    changeSlot=(date, time) => {
        this.setState({
            date: date,
            time: time
        })
    }


  render() {
    return (
      <>
        <Container className="request">
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg "
            >
              <AuthContext.Consumer>
                {({ user, ...rest }) => {
                  return (
                  <div className="request-background">
 <Form>
                        <h3 style={{fontWeight: "bold"}} className="shadow-sm mt-3 p-3 text-center rounded">
                      Request Reservation
                    </h3>
                      <SlotSelector
                        resource={this.props.match.params.resourceID}
                        changeSlot={this.changeSlot}
                      />
                      <Nav className="justify-content-center">
                        <Button
                        style={{ marginTop: "1vw", marginRight: "1vw", backgroundColor: "#e2a44c", borderColor: "orange", opacity: "90%" }}
                          onClick={(e) => {
                            e.preventDefault();
                            try {
                              createReservation(
                                new Reservation(
                                  user.uid,
                                  this.props.match.params.resourceID,
                                  `${this.state.date}T${this.state.time}`,
                                  "pending"
                                )
                              )
                              .then(() => this.props.history.push("/my-reservations"))
                              .catch((e) => {
                              console.log(e)
                              Swal.fire({
                                title: "Failed to create a reservation!",
                                text: `${e.message}`,
                                icon: "error",
                                confirmButtonText:"OK"})
                            })
          
                        } catch(error) {
                            console.log(e)
                            Swal.fire({
                            title: "Failed to create a reservation!",
                            text: `${error.message}`,
                            icon: "error",
                            confirmButtonText:"OK"})}
                          }}
                        >
                          {" "}
                          Create{" "}
                        </Button>
                        <Button style={{ marginTop: "1vw", opacity: "90%" }} className="cancel-btn" variant="danger">
                          <Link style={{ textDecoration: "none", color: "white" }} to="/resources"> Cancel </Link>
                        </Button>
                      </Nav>
                    </Form>
                  </div>
                   
                  );
                }}
              </AuthContext.Consumer>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
