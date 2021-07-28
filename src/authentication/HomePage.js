import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TaxonomyContext } from "../context/context";
import "./homePage.css";
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Nav className="mt-3">
          <video autoPlay="autoPlay" loop="loop" muted>
            <source
              src="https://firebasestorage.googleapis.com/v0/b/bookr-thumbs-up.appspot.com/o/barberthumbsup800.mp4?alt=media&token=bb5184b5-5e02-47a2-a40f-a8dae4625ef2"
              type="video/mp4"
            />
          </video>
          <Link to={`/${this.context.url}`}>
            <Button className="res-btn">Reservation</Button>
          </Link>
        </Nav>
      </>
    );
  }
}
HomePage.contextType = TaxonomyContext;
