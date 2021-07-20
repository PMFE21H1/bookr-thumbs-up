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
      oldDescription: "",
      newDescription: "",
    };
  }

  componentDidMount() {
    fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${this.state.resourceID}.json`
    )
      .then((response) => response.json())
      .then((resource) => this.setState({ oldResourceName: resource.name, oldDescription: resource.description }));
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
      updateResource(this.state.resourceID, {
        name: this.state.newResourceName,
        description: this.state.newDescription,
      }) .then(()=>this.props.history.push('/admin/resources'))
    } catch (e) {
      alert(e.message);
    }
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
            <input
              type="text"
              placeholder={this.state.oldDescription}
              onChange={this.updateDescription}
              value={this.state.newDescription}
            />
            <button
              onClick={this.handleApply}
                // updateResource(this.state.resourceID, {
                //   name: this.state.newResourceName,
                //   description: this.state.newDescription,
                // })
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
