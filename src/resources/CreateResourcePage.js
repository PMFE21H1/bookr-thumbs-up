import React from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createResource, Resource } from "./resources";
import {TaxonomyContext} from "../context/context";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import UploadFile from "./UploadFile";
import { firebaseApp } from "../reservations/reservations";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";



const storage = getStorage(firebaseApp);
const barbersRef = ref(storage, 'barbers');
const barberImgRef = ref(storage, 'barbers/barber.jpg');
const rootRef = ref(storage)



export default class CreateResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceName: "",
      description: "",
      file: null,
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

  fileChanged = (e) => {
    console.log(e.target.files[0])
    this.setState({file: e.target.files[0]});
}

  render() {
    return (
      <TaxonomyContext.Consumer>
                { (taxonomy)=>{
                    return <>
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
                <input
                  type="text"
                  onChange={this.updateName}
                  value={this.state.resourceName}
                />

                <h6 className="shadow-sm tect-success mt-5 p-3 text-center rounded">
                  {" "}
                  {taxonomy.resource} Image{" "}
                </h6>
                <input type="file" onChange={this.fileChanged}></input>

                <h6 className="shadow-sm tect-success mt-2 p-3 text-center rounded">
                  {" "}
                  {taxonomy.resource} Description{" "}
                </h6>
                <textarea
                  onChange={this.updateDescription}
                  value={this.state.description}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      
                      const barberImgRef = ref(storage, `barbers/${this.state.file.name}`);
                      uploadBytes(barberImgRef, this.state.file)
                      
                      .then(() => getDownloadURL(barberImgRef)
                      )

                      .then(url => {
                    
                        createResource(
                          new Resource(
                           this.state.resourceName,
                           this.state.description,
                           url)
                        )})
                      
                      .then(() =>
                        this.props.history.push(`/admin/config/${taxonomy.url}`)
                      ).catch(uploadError => console.log(uploadError))
                    } catch (e) {
                      Swal.fire({
                        title: "Failed to made a reservation!",
                        text: `${e.message}`,
                        icon: "error",
                        confirmButtonText:"OK"});
                    }
                  }}
                >
                  {" "}
                  Create
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.props.history.push("/admin/config/resources")}
                >
                  {" "}
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
  }}
  </TaxonomyContext.Consumer>
    );
  }
}
