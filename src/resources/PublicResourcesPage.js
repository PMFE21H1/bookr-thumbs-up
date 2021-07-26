import React from "react";
import { listResources } from "./resources";
import { Link } from "react-router-dom";
import {
  Table,
  Col,
  Container,
  Row,
  Form,
  Button,
  Nav,
  Card,
} from "react-bootstrap";
export default class PublicResourcesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
    };
  }

  componentDidMount() {
    listResources().then((resources) =>
      this.setState({
        resources: resources,
      })
    );
  }

  render() {
    return (
      <>
        <Table>
          <tbody>
            {this.state.resources.map((resource) => (
              <tr>
                <td>
                  <Card.Title>{resource.name}</Card.Title>{" "}
                  <p> {resource.description} </p>{" "}
                  <Link to={`/resources/${resource.id}/request-reservation`}>
                    {" "}
                    Request Reservation{" "}
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
