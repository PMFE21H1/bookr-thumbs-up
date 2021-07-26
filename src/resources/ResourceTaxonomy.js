import React from "react";
import { Col, Container, Row, Form, Button, Nav } from "react-bootstrap";
export default class ResourceTaxonomy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newResourceTextSingular: "",
      newResourceTextPlural: "",
      newUrl: "",
    };
  }

  updateTaxonomy = () => {
    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/taxonomy.json`,
      {
        body: JSON.stringify({
          resource: this.state.newResourceTextSingular,
          resources: this.state.newResourceTextPlural,
          url: this.state.newUrl,
        }),
        method: "PUT",
      }
    ).then(
      this.props.taxonomyChange(
        this.state.newResourceTextSingular,
        this.state.newResourceTextPlural,
        this.state.newUrl
      )
    );
  };

  updateNewResourceTextSingular = (e) => {
    this.setState({
      newResourceTextSingular: e.target.value,
    });
  };

  updateNewResourceTextPlural = (e) => {
    this.setState({
      newResourceTextPlural: e.target.value,
      newUrl: e.target.value.toLowerCase(),
    });
  };

  render() {
    return (
      <>
        <Container>
          <Form>
            <h2 className="shadow-sm tect-success mt-5 p-3 text-center rounded">
              Change Resource Name
            </h2>
            <Nav className="justify-content-center mt-5">
              <label>Singular Name</label>
              <input
                value={this.state.newResourceTextSingular}
                onChange={this.updateNewResourceTextSingular}
              />
            </Nav>
            <Nav className="justify-content-center mt-4 ml-3">
              <label>Plural Name</label>
              <input
                value={this.state.newResourceTextPlural}
                onChange={this.updateNewResourceTextPlural}
              />
            </Nav>
            <Nav className="justify-content-center mt-5">
              <Button onClick={this.updateTaxonomy}>Submit</Button>
            </Nav>
          </Form>
        </Container>
      </>
    );
  }
}
