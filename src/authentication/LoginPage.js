import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    setEmail = (e) => {
        this.setState({email: e.target.value})
    }

    setPassword = (e) => {
        this.setState({password: e.target.value})
    }
    
logIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user= userCredential.user
        this.props.onLogIn(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      console.log(this.state)
    }
    

    render(){
        return(
            <>
                <h3>Log In</h3>
                <form>
                    <span>E-mail</span>
                    <input type="email" onChange={(e) => this.setEmail(e)} value={this.state.email}/>
                    <span>Password</span>
                    <input type="password" onChange={(e) =>this.setPassword(e)} value={this.state.password}/>
                    <button onClick={
                        (e) =>{
                        e.preventDefault()
                        this.logIn()
                    }}>Login</button>
                </form>

            </>
        )
    }
}