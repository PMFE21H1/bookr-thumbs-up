import React, { Component } from "react";
import { listResources, Resource } from "../resources/resources";
import { createReservation, Reservation } from "./reservations";
import SlotSelector from "./SlotSelector";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import UserSelector from "./UserSelector";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

export default class CreateReservationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceToSubmit: {},
      resource: "",
      customerUid: "",
      date: "",
      time: "",
      resources: [],
    };
  }

  componentDidMount() {
    listResources().then((resourcesArr) =>
      resourcesArr.map((resource) => {
        this.setState(() => {
          return { resources: [...this.state.resources, resource] };
        });
      })
    );
  }

  changeCustomer = (newUserUid) => {
    console.log(newUserUid);
    this.setState({ customerUid: newUserUid });
  };

  changeResource = (e) => {
    this.state.resources.forEach((resource) => {
      if (resource.id === e.target.value) {
        this.setState({ resourceToSubmit: resource, resource: resource.id });
      }
    });
  };

  changeSlot = (date, time) => {
    this.setState(() => {
      return { date: date, time: time };
    });
    console.log(this.state);
  };

  changeToDefault = () => {
    this.setState({
      resource: "",
      customerUid: "",
      date: "",
      time: "",
    });
  };

  onClickCreateReservation = (e, user) => {
    e.preventDefault();
    try {
      createReservation(
        new Reservation(
          this.state.customerUid,
          this.state.resource,
          `${this.state.date}T${this.state.time}`,
          "confirmed"
        )
      ).catch((error) => {
        alert(error.message);
      })
          .then(() => this.props.history.push("/admin/reservations"));


    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ user, ...rest }) => {
          return (
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
                      Create Reservation
                    </h3>

                    <div>
                      <label>Resource:</label>
                      <select
                        onChange={(e) => this.changeResource(e)}
                        value={this.state.resource}
                      >
                        <option value={null}>Select a resource</option>

                        {this.state.resources !== []
                          ? this.state.resources.map((resource) => (
                              <option key={resource.id} value={resource.id}>
                                {resource.name}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>

                    <div>
                      <label>Customer:</label>
                      <UserSelector onHandleName={this.changeCustomer} />
                    </div>

                    <SlotSelector
                      resource={this.state.resource}
                      changeSlot={this.changeSlot}
                    ></SlotSelector>

                    <Button
                      variant="primary btn-block"
                      style={{marginTop: "1vw", marginRight: "1vw"}}
                      type="submit"
                      onClick={(e) => {
                        console.log(user);
                        this.onClickCreateReservation(e, user);
                      }}
                    >
                      Create
                    </Button>

                    <Button
                        style={{marginTop: "1vw"}}
                      variant="danger btn-block"
                      type="submit"
                      onClick={() =>
                        this.props.history.push("/admin/reservations")
                      }
                    >
                      {" "}
                      Cancel
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
