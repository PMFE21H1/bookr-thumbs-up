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
                <form>
                    <p> Resource Name </p>
                    <input type="text" onChange={this.upDateName} value={this.state.resourceName}/>

                    <button onClick={
                        (e) => {

                            e.preventDefault()
                            try {
                                createResource(new Resource(this.state.resourceName)) .then(()=>this.props.history.push('/admin/resources'))
                            } catch (e) {
                                alert(e.message)
                            }
                        }
                    }> Create
                    </button>
                    <button> Cancel</button>
                </form>

            </>
        )
    }
}


