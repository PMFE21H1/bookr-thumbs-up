import React, { Component } from "react";
import { AuthContext, TaxonomyContext, UsersDatabaseContext } from "../context/context";
import { Link } from "react-router-dom";
import { getUserByUid } from "./authentication";


export default class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <TaxonomyContext.Consumer>
        {
          (taxonomy) => {
            return (<>
        <AuthContext.Consumer>
          {({ user }) => {
            if (!user) {
              return (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/registration">Registration</Link>
                  <Link to={`/${taxonomy.resources}`}>Public {taxonomy.resources}</Link>
                </>
              );
            } else {
                  return user.admin ? 
                    
                    <>
                      <Link to={`/admin/config/${taxonomy.resources}`}>{taxonomy.resources}</Link>
                      <Link to="/admin/reservations">Reservations</Link>
                      <Link to="/admin/config">Config</Link>
                      <Link to="/admin/config/resources/taxonomy">Taxonomy</Link>
                      <p>Logged in as Admin</p>
                    </>

                    :

                    <>
                      <Link to="/my-reservations">Reservations</Link>
                      <Link to={`/${taxonomy.resources}`}>Public {taxonomy.resources}</Link>
                      <p>User</p>
                    </>

                    }
          }}
        </AuthContext.Consumer>
        </>)
          }
        }
        </TaxonomyContext.Consumer>
      </div>
    );
  }
}