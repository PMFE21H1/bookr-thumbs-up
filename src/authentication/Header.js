import React, { Component } from "react";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { Link } from "react-router-dom";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {({ user }) => {
            if (!user) {
              return (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/registration">Registration</Link>
                  <Link to="/resources">Public Recources</Link>
                </>
              );
            } else {
              <UsersDatabaseContext.Consumer>
                {(usersFromDatabase) => {
                    console.log(usersFromDatabase)
                    console.log(user)
                  return usersFromDatabase.map((userFromDatabase) => {
                    userFromDatabase.uid === user.uid ? (
                      <h1>{user.name}</h1>
                    ) : (
                      <h1>nem volt jo a kod</h1>
                    );
                  });
                }}
              </UsersDatabaseContext.Consumer>;
            }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}
