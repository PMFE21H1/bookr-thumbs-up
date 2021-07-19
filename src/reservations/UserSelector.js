import React from 'react'
import { listUsersFromDatabase } from '../authentication/authentication'

export default class UserSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            selectedUser:null
        }
    }

    componentDidMount(){
        listUsersFromDatabase().then(users => this.setState({users: users}))
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selectedUser !== this.state.selectedUser){
        this.props.onHandleName(this.state.selectedUser)
        }
    }

    handleChange = (e) => {
        this.setState({selectedUser: e.target.value})
    }
    
    render(){
        return (
            <>
            <select onChange={(e) => this.handleChange(e)} value={this.state.selectedUser}>

                <option value={null}>Select user</option>

            {
                this.state.users.map(user => {
                    return <option value={user.email}>{user.name}: {user.email}</option>
                })
            }
            </select>
            </>
        )
    }
}
