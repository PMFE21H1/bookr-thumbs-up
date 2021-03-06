import React from "react";
import { listUsersFromDatabase } from "../authentication/authentication";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { PATTERNLIKE_TYPES } from "@babel/types";
import { Form } from "react-bootstrap";

export default class UserSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedUser !== this.state.selectedUser) {
      this.props.onHandleName(this.state.selectedUser);
    }
  }

  handleChange = (e) => {
    this.setState({ selectedUser: e.target.value });
  };

  render() {
    return (
      <UsersDatabaseContext.Consumer>
        {(users) => {
          return (
            <Form.Select
              onChange={(e) => this.handleChange(e)}
              value={this.state.selectedUser}
            >
              <option value={null}>Select user</option>

              {users.map((user) => {
                return (
                  <option value={user.uid}>
                    {user.name}: {user.email}
                  </option>
                );
              })}
            </Form.Select>
          );
        }}
      </UsersDatabaseContext.Consumer>
    );
  }
}
