import React from "react"

export default class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:null,

        }
    }
    render(){
        return(
            <div>
                <h3>Log In</h3>
                <form>
                    <span>E-mail</span>
                    <input type="email"/>
                    <span>Password</span>
                    <input type="password"/>
                    <button>Login</button>
                </form>

            </div>
        )
    }
}