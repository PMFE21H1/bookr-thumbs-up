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
      <div style={{width:'20rem', marginLeft: 'auto', marginRight:'auto'}}>
        <Table borderless>
          <tbody>
            {this.state.resources.map((resource) => (
              <tr>
                <td>
                  <Card style={{textAlign: 'center', width: '18rem', padding: '0px 0px 10px 0px' }}>
                    
                    <Card.Img variant="top" src={resource.imgUrl ? resource.imgUrl : 'defaultBarber.jpg'} />
                    <Card.Title>{resource.name}</Card.Title>{" "}
                    <Card.Text> {resource.description} </Card.Text>{" "}
                    <Card.Link>
                    <Link to={`/resources/${resource.id}/request-reservation`}>
                      {" "}
                      Request Reservation{" "}
                    </Link>{" "}
                    </Card.Link>
                  </Card>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
