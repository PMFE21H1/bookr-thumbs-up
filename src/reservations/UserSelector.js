import React from 'react'
import { listUsersFromDatabase } from '../authentication/authentication'

export default class UserSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:null
        }
    }

    componentDidMount(){
        listUsersFromDatabase().then(users => this.setState({users: users}))
    }
    
    render(){
        return (
            <select>
                {this.state.users ? 
                    this.state.users.map(user => {
                        return <option>{user.name}</option>
                    })
                    :
                    <p></p>
            }
            </select>
        )
    }
}
