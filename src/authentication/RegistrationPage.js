import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmation: "",
      customer: "",
    };
  }

  register = () => {
    if (this.state.password === this.state.confirmation) {
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.customer = this.state.customer;
          user.admin = false;
          const userToDatabase = {
            customer: this.state.customer,
            email: this.state.email,
            admin: false,
          };
          fetch()
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      throw new Error("The password and the confirmation-password didnt match");
    }
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmation = (e) => {
    this.setState({
      confirmation: e.target.value,
    });
  };
  handleCustomer = (e) => {
    this.setState({
      customer: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <form>
          <h3>Registration Page</h3>
          <p>Customer Name</p>
          <input onChange={(e) => this.handleCustomer(e)}></input>
          <p>Email</p>
          <input onChange={(e) => this.handleEmail(e)}></input>
          <p>Password</p>
          <input onChange={(e) => this.handlePassword(e)}></input>
          <p>Password Confirmation</p>
          <input onChange={(e) => this.handleConfirmation(e)}></input>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Registration
        </button>
      </div>
    );
  }
}
