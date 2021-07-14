import React from "react"

export default class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
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