import React from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createResource, Resource } from "./resources";
import { TaxonomyContext } from "../context/context";
import { Col, Container, Row, Form, Button, Nav } from "react-bootstrap";

export default class CreateResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceName: "",
      description: "",
    };
  }

  updateName = (e) => {
    this.setState({
      resourceName: e.target.value,
    });
  };
  updateDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    return (
      <TaxonomyContext.Consumer>
        {(taxonomy) => {
          return (
            <>
              <Container>
                <Row className="mt-5">
                  <Col
                    lg={5}
                    md={6}
                    sm={12}
                    className="p-5 m-auto shadow-sm rounded-lg"
                  >
                    <Form>
                      <h6 className="shadow-sm tect-success mt-5 p-3 text-center rounded">
                        {" "}
                        {taxonomy.resource} Name{" "}
                      </h6>
                      <Nav className="justify-content-center mt-2">
                        <input
                          type="text"
                          onChange={this.updateName}
                          value={this.state.resourceName}
                        />
                      </Nav>

                      <h6 className="shadow-sm tect-success mt-2 p-3 text-center rounded">
                        {" "}
                        {taxonomy.resource} Description{" "}
                      </h6>
                      <Nav className="justify-content-center mt-2">
                        <textarea
                          onChange={this.updateDescription}
                          value={this.state.description}
                        />
                      </Nav>

                      <Nav className="justify-content-center mt-2">
                        <Nav className="mr-2">
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              try {
                                createResource(
                                  new Resource(
                                    this.state.resourceName,
                                    this.state.description
                                  )
                                ).then(() =>
                                  this.props.history.push(
                                    "/admin/config/resources"
                                  )
                                );
                              } catch (e) {
                                alert(e.message);
                              }
                            }}
                          >
                            {" "}
                            Create
                          </Button>
                        </Nav>

                        <Button
                          variant="danger"
                          onClick={() =>
                            this.props.history.push("/admin/config/resources")
                          }
                        >
                          {" "}
                          Cancel
                        </Button>
                      </Nav>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </>
          );
        }}
      </TaxonomyContext.Consumer>
    );
  }
}
