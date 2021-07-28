import React from "react";
import {listResources} from "./resources";
import {Link} from "react-router-dom";
import {
    Table,
    Col,
    Container,
    Row,
    Form,
    Button,
    Nav,
    Card,
} from "react-bootstrap";
import "./publicResource.css"
import PublicResourceDisplay from "./PublicResourceDisplay";


export default class PublicResourcesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
        };
    }

    componentDidMount() {
        listResources().then((resources) =>
            this.setState({
                resources: resources,
            })
        );
    }

    render() {

        return (
            <>
                <div className="public-res-container">
                    {this.state.resources.map((resource) => {
                       return <PublicResourceDisplay resource={resource} />
                    })}
                </div>
            </>
        );
    }
}
