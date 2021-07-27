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
                        return <div className="pub-res"
                                    style={{backgroundImage:resource.imgUrl?`url("${resource.imgUrl}")`: "url('defaultBarber.jpg')"}}
                        onMouseEnter={}>
                            <div className="public-res-inner-container">
                            <h5>{resource.name}</h5>
                            <p>{resource.description}</p>
                            <Link to={`/resources/${resource.id}/request-reservation`}>
                                Request Reservation
                            </Link>
                            </div>

                        </div>
                    })}
                </div>
            </>
        );
    }
}
