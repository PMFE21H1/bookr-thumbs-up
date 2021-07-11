import React from "react";
import {Link} from "react-router-dom"
import {updateResource} from "./resources";

export class UpdateResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newResourcename: ""

        }


    }

    componentDidMount() {
        fetch("")
    }

    updateResourceName = (e) => {
        this.setState({
            newResourcename: e.target.value
        })
    }


    render() {
        return (
            <>
                <input type="text" onChange={this.updateResourceName} value={}/>
                <button onClick={updateResource()}>Apply</button>
                <Link to="/admin/resource">Cancel</Link>
            </>
        )

    }

}

