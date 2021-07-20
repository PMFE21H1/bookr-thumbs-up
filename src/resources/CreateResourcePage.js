import React from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createResource, Resource } from "./resources";

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
      <>
        <form>
          <p> Resource Name </p>
          <input
            type="text"
            onChange={this.updateName}
            value={this.state.resourceName}
          />
          <p> Resource Description </p>
          <input
            type="text"
            onChange={this.updateDescription}
            value={this.state.description}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              try {
                createResource(new Resource(this.state.resourceName, this.state.description)).then(() =>
                  this.props.history.push("/admin/resources")
                );
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            {" "}
            Create
          </button>
          <button onClick={() => this.props.history.push("/admin/resources")}> Cancel</button>
        </form>
      </>
    );
  }
}
