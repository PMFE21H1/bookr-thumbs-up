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
                    
                    <>
                      <Link to="/admin/config/resources">Resources</Link>
                      <Link to="/admin/reservations">Reservations</Link>
                      <p>Admin</p>
                    </>

                    :

                    <>
                      <Link to="/my-reservations">Reservations</Link>
                      <Link to="/resources">Public Recources</Link>
                      <p>User</p>
                    </>

                    }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}