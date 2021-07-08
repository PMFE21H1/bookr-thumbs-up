import React from "react";
import {Link, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createResource, Resource} from "./resources";


export default class CreateResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceName: ""
        }
    }

    upDateName = (e) => {
        this.setState({
            resourceName: e.target.value
        })
    }

    render() {
        return (
            <>
                <div>
                    <p> Resource Name </p>
                    <input type="text" onChange={this.upDateName} value={this.state.resourceName}/>

                    <button onClick={() =>{try{createResource(new Resource(this.state.resourceName))}catch(e){alert(e.message)}}
                    }> Create </button>
                    <button> Cancel</button>

                </div>
                <Router>
                    <Route path="/admin/resources/create">
                        <CreateResourcePage/>
                    </Route>
                </Router>
            </>
        )
    }
}