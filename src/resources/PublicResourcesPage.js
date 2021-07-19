import React from "react";
import {listResources} from "./resources";
import {Link} from "react-router-dom";

export default class PublicResourcesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: []
        }
    }

    componentDidMount() {
        listResources().then((resources) =>
            this.setState({
                resources: resources
            }))
    }


    render() {

        return (
            <>
                {this.state.resources.map(resource =>
                    <div> {resource.name} <p> description </p> <Link to= /resources/resource.id/request-reservation > Reservation Request Page </Link> </div>
                )}
            </>
        )
    }
}
