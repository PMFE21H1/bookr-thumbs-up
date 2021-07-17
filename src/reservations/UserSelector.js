import React from 'react'
import { listUsersFromDatabase } from '../authentication/authentication'

export default class UserSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:null,
            selectedUser:null
        }
    }

    componentDidMount(){
        listUsersFromDatabase().then(users => this.setState({users: users}))
    }

    handleChange = (e) => {
        this.setState({selectedUser: e.target.value})
    }
    
    render(){
        return (
            <>
            <h1>{this.state.selectedUser}</h1>
            <select onChange={(e) => this.handleChange(e)} value={this.state.selectedUser}>

                <option value={null}>Select user</option>

                {this.state.users ? 
                    this.state.users.map(user => {
                        return <option value={user.uid}>{user.name}: {user.email}</option>
                    })
                
                    :
                
                <option value={null}>Select a user</option>
            }
            </select>
            </>
        )
    }
}
