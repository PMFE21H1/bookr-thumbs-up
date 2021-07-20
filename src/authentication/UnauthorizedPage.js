import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class UnauthorizedPage extends Component {
    render() {
        return (
            <div>
                <h1>This page is not authorized for you</h1>
                <Link to='/my-reservations'>Back to home page</Link>
            </div>
        )
    }
}
