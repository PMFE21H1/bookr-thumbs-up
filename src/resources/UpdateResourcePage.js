import React from "react";
import { Link } from "react-router-dom";
import { updateResource } from "./resources";

export class UpdateResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newResourceName: "",
      resourceID: this.props.match.params.resourceID,
      oldResourceName: "",
    };
  }

  componentDidMount() {
    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.resourceID}.json`
    )
      .then((response) => response.json())
      .then((resource) => this.setState({ oldResourceName: resource.name }));
  }

  updateResourceName = (e) => {
    this.setState({
      newResourceName: e.target.value,
    });
  };

  render() {
    return (
      <>
        {this.state.oldResourceName ? (
          <div>
            <input
              type="text"
              placeholder={this.state.oldResourceName}
              onChange={this.updateResourceName}
              value={this.state.newResourceName}
            />
            <button
              onClick={() =>
                updateResource(this.state.resourceID, {
                  name: this.state.newResourceName,
                })
              }
            >
              Apply
            </button>
            <Link to="/admin/resources">Cancel</Link>
          </div>
        ) : (
          <p></p>
        )}
      </>
    );
  }
}
