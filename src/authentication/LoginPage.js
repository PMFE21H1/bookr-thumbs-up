import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { listUsersFromDatabase } from "./authentication";
import { tsImportEqualsDeclaration } from "@babel/types";


export default class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            users:[]
        }
    }

    setEmail = (e) => {
        this.setState({email: e.target.value})
    }

    setPassword = (e) => {
        this.setState({password: e.target.value})
    }

componentDidMount(){
    listUsersFromDatabase().then(users => 
        {this.setState({users: users})
        console.log(users)})
}
    
logIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user= userCredential.user
        this.props.onLogIn(user)
        console.log(this.state.users)

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