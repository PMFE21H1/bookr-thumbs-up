import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { saveAccountToDatabase } from "./authentication";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmation: "",
      name: "",
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
          user.name = this.state.name;
          user.admin = false;
          console.log(user)
          saveAccountToDatabase(this.state.name, this.state.email, false, user.uid)
          this.props.onLogIn(user)
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
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <form>
          <h3>Registration Page</h3>
          <p>Customer Name</p>
          <input onChange={(e) => this.handleName(e)}></input>
          <p>Email</p>
          <input type="email" onChange={(e) => this.handleEmail(e)}></input>
          <p>Password</p>
          <input type="password" onChange={(e) => this.handlePassword(e)}></input>
          <p>Password Confirmation</p>
          <input type="password" onChange={(e) => this.handleConfirmation(e)}></input>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            this.register()
            .then(()=>this.props.history.push('/user/my-reservations'))
          }}
        >
          Registration
        </button>
      </div>
    );
  }
}
