import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
export class ConfigPage extends Component {
  render() {
    return (
      <div>
        {/* - Slots: /admin/config/slot - Resources: /admin/config/resources
        (previously: /admin/resources) - Site: /admin/config/site */}
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/config/slot">
              Slots
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/config/resources">
              Resources
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/config/site">
              Site
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default ConfigPage;
