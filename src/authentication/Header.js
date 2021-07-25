import React, { Component } from "react";
import { AuthContext, UsersDatabaseContext } from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";


export default class Header extends Component {
  constructor(props) {
    super(props);

  }

    signout = () => {
        signOut(getAuth())
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
                  <Link to="/resources">Public Resources</Link>
                </>
              );
            } else {
                  return user.admin ? 
                    
                    <>
                      <Link to="/admin/resources">Resources</Link>
                      <Link to="/admin/reservations">Reservations</Link>
                      <p>Admin</p>
                    </>

                    :

                    <>
                      <Link to="/my-reservations"> My Reservations</Link>
                      <Link to="/resources">Public Recources</Link>
                        <button onClick={this.signout} > Log out</button>
                      <p>{user.name}</p>
                    </>

                    }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}