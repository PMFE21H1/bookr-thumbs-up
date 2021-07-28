import React from "react"
import {listResources} from "../resources/resources";
import {unavailableSlot} from "./reservations";
import SlotSelector from "./SlotSelector"
import Swal from "sweetalert2";
import "./unavailableSlots.css";
import {
  Form,
  Container,
  Row,
  Col,
  Nav,
  Button,
  Dropdown,
} from "react-bootstrap";

export default class UnavailableSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      selectedResource: "",
      date: "",
      time: "",
    };
  }

  componentDidMount() {
    listResources().then((resourcesArr) =>
      this.setState(() => {
        return { resources: resourcesArr };
      })
    );
  }

  changeResource = (e) => {
    this.state.resources.forEach((resource) => {
      if (resource.id === e.target.value) {
        this.setState({ selectedResource: resource.id });
      }
    });
  };

  changeSlot = (date, time) => {
    this.setState(() => {
      return { date: date, time: time };
    });
  };

  sendData=(e)=>{
    e.preventDefault();
    try
    {
        unavailableSlot(this.state.selectedResource, this.state.date, this.state.time)
    }catch (e){
        Swal.fire({
            title: "Failed to send data to database!",
            text: `${e.message}`,
            icon: "error",
            confirmButtonText:"OK"})
        }
    }

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg "
          >
            <Form>
              <Form.Select
                onChange={(e) => this.changeResource(e)}
                value={this.state.resource}
              >
                <option value={null}>Select a resource</option>
                {this.state.resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                ))}
              </Form.Select>
              <SlotSelector
                resource={this.state.selectedResource}
                changeSlot={this.changeSlot}
              ></SlotSelector>
              <Button className="save-btn" onClick={(e) => this.sendData(e)}>Save</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
