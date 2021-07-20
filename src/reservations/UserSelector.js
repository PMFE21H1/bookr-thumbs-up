import React from 'react'
import { listUsersFromDatabase } from '../authentication/authentication'
import { UsersDatabaseContext } from '../App'
import { PATTERNLIKE_TYPES } from '@babel/types'

export default class UserSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedUser:null,
        }
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
            <UsersDatabaseContext.Consumer>
                {(users) => {
            return <select onChange={(e) => this.handleChange(e)} value={this.state.selectedUser}>

                <option value={null}>Select user</option>

            {
                users.map(user => {
                    console.log(user)
                    return <option value={user.uid}>{user.name}: {user.email}</option>
                })
            }
            </select>
    }}
            </UsersDatabaseContext.Consumer>
        )
    }
}
