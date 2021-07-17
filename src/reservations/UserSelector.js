import React from 'react'
import { listUsersFromDatabase } from '../authentication/authentication'

export default class UserSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        listUsersFromDatabase().then(users => this.setState({users: users}))
    }
    
    render(){
    return (
        <select>
            
        </select>
    )
    }
}
