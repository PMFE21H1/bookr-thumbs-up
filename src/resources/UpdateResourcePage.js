import React from "react";
import { Link } from "react-router-dom";
import { updateResource } from "./resources";
import { TaxonomyContext } from "../context/context";
import DeleteResourcePage from "./DeleteResourcePage";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl, Button, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { firebaseApp } from "../reservations/reservations";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2"; 


const storage = getStorage(firebaseApp);
const barbersRef = ref(storage, 'barbers');
const barberImgRef = ref(storage, 'barbers/barber.jpg');
const rootRef = ref(storage)

export class UpdateResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newResourceName: "",
      resourceID: this.props.match.params.resourceID,
      oldResourceName: "",
      // felvettuk a descriptionokat a statbe, hasonlo mintara mint a resourcok amik mar benne voltak
      oldDescription: "",
      newDescription: "",
      oldImgUrl:null,
      newImgUrl: null,

    };
  }

  componentDidMount() {
    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.resourceID}.json`
    )
      .then((response) => response.json())
      .then((resource) =>
        this.setState({
          oldResourceName: resource.name,
          //a fetchelt adatokbol setStateltuk a mar meglevo descriptiont
          oldDescription: resource.description,
          file: resource.imgUrl
        })
      );
  }

  updateResourceName = (e) => {
    this.setState({
      newResourceName: e.target.value,
    });
  };
  
  updateDescription = (e) => {
    this.setState({
      newDescription: e.target.value,
    });
  };
  
  handleApply = () => {
    try {
      const barberImgRef = ref(storage, `barbers/${this.state.file.name}`);
      uploadBytes(barberImgRef, this.state.file)
        .then(() => getDownloadURL(barberImgRef)
      )

      .then(url => {
       return updateResource(this.state.resourceID, {
          name: this.state.newResourceName,
          description: this.state.newDescription,
          imgUrl: url

        })
      }).catch(e => Swal.fire({
        title: "Failed to update the resouce!",
        text: `${e.message}`,
        icon: "error",
        confirmButtonText:"OK"}))

      .then(() =>
        this.props.history.push(`/admin/config/${this.context.url}`)
      );

    } catch (e) {
      Swal.fire({
        title: "Failed to update the resouce!",
        text: `${e.message}`,
        icon: "error",
        confirmButtonText:"OK"});
    }
  };

  fileChanged = (e) => {
    this.setState({file: e.target.files[0]});
}

  render() {
    return (
      <>
        {this.state.oldResourceName ? (
          <div style={{width:"500px", marginLeft: "auto", marginRight: "auto", marginTop: "70px" } }>
            <InputGroup size="lg" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-lg">
                {this.context.resource} Name
              </InputGroup.Text>
              <FormControl
                type="text"
                onChange={this.updateResourceName}
                value={this.state.newResourceName}
                placeholder={this.state.oldResourceName}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-lg"
              />
            </InputGroup>

            <h6 className="shadow-sm tect-success mt-5 p-3 text-center rounded">
                  {" "}
                  Image{" "}
            </h6>

            <input type="file" onChange={this.fileChanged}></input>

            <InputGroup
              controlId="floatingTextarea"
              label={this.state.oldDescription}
              className="mb-3"
            >
              <InputGroup.Text id="inputGroup-sizing-sm">
                {this.context.resource} Description
              </InputGroup.Text>
              <Form.Control
                placeholder={this.state.oldDescription}
                onChange={this.updateDescription}
                value={this.state.newDescription}
                as="textarea"
              />
            </InputGroup>
            <Nav className="justify-content-center">
              <Nav className="mr-2 ml-2">

                <Button onClick={this.handleApply}   style ={{marginRight: "1vw" }} >Apply</Button>

              </Nav>
              <Link to={`/admin/config/${this.context.url}`}>
                <Button variant="danger">Cancel</Button>
              </Link>
            </Nav>
          </div>
        ) : (
          <p></p>
        )}
      </>
    );
  }
}

UpdateResourcePage.contextType = TaxonomyContext;
