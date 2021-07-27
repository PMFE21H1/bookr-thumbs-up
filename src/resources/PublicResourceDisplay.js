import React from "react";
import {Link} from "react-router-dom";

export default class PublicResourceDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hover: false
        }
    }


    render() {
        let defeaultStyle = {backgroundImage:this.props.resource.imgUrl?`url("${this.props.resource.imgUrl}")`: "url('defaultBarber.jpg')"}

        let hoverStyle = {opacity: "25%", filter:"blur(10px)",backgroundImage:this.props.resource.imgUrl?`url("${this.props.resource.imgUrl}")`: "url('defaultBarber.jpg')" }


        return (<div className="public-resource-display-container"
                     onMouseOver={()=>this.setState({hover:true})}
                     onMouseOut={()=>this.setState({hover:false})}>
                    <div className="pub-res"
                         style={this.state.hover ? hoverStyle : defeaultStyle}
                        >
                    </div>
                        <div className="public-res-inner-container "
                             style={{filter:"none"}}>
                            <h5>{this.props.resource.name}</h5>
                            <p>{this.props.resource.description}</p>
                            <Link to={`/resources/${this.props.resource.id}/request-reservation`}>
                                Request Reservation
                            </Link>
                        </div>

                    </div>

   )
    }
}