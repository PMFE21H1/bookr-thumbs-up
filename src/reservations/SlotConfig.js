import React from 'react'
import {Link} from "react-router-dom";
import {configSlot} from "./reservations"
import Swal from 'sweetalert2';
import { Form, Container, Row, Col, Nav, Button } from "react-bootstrap";
import "./slotConfig.css";

export default class SlotConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slotConfig: {
        start: "",
        end: "",
        duration: "",
      },
    };
  }

  changeStartTime = (e) => {
    this.setState({
      slotConfig: { ...this.state.slotConfig, start: e.target.value },
    });
  };
  changeEndTime = (e) => {
    this.setState({
      slotConfig: { ...this.state.slotConfig, end: e.target.value },
    });
  };
  changeDuration = (e) => {
    this.setState({
      slotConfig: { ...this.state.slotConfig, duration: e.target.value },
    });
  };
  setSlot = (e) => {
    e.preventDefault();
    try {
      configSlot(
        this.state.slotConfig.start,
        this.state.slotConfig.end,
        this.state.slotConfig.duration
      );
    } catch (e) {
        Swal.fire({
            title: "Failed to config the slot!",
            text: `${e.message}`,
            icon: "error",
            confirmButtonText:"OK"})
    }
  };

  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg "
            >
              <Form>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Start Time"
                    onChange={(e) => this.changeStartTime(e)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="End Time"
                    onChange={(e) => this.changeEndTime(e)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Slot Duration</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="minutes"
                    onChange={(e) => this.changeDuration(e)}
                  ></Form.Control>
                </Form.Group>

                <Button className="set-slot" onClick={(e) => this.setSlot(e)}>
                  Set slot
                </Button>
              </Form>
              <Nav className="justify-content-center">
                <Link to="/admin/config/slot/availability">Unavailability</Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
