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
import "./publicResource.css"


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
      <div className="public-res-cont" style={{width:"100%", marginLeft: 'auto', marginRight:'auto'}}>


            {this.state.resources.map((resource) => (

                  <Card style={{textAlign: 'center', width: '18rem', padding: '0px 0px 10px 0px' }}>
                    
                    <Card.Img variant="top" src={resource.imgUrl ? resource.imgUrl : 'defaultBarber.jpg'} />
                    <Card.Title className="res-name">{resource.name}</Card.Title>{" "}
                    <Card.Text> {resource.description} </Card.Text>{" "}
                    <Card.Link>
                    <Link to={`/resources/${resource.id}/request-reservation`}>
                      {" "}
                      Request Reservation{" "}
                    </Link>{" "}
                    </Card.Link>
                  </Card>

            ))}


      </div>
    );
  }
}
