import React, { Component } from "react";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";


export default class Header extends Component {
  constructor(props) {
    super(props);

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
                  return user.admin ? 

                    <h1> Admin vagy </h1>
                
                    :

                    <h1>User vagy</h1>

                    }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}