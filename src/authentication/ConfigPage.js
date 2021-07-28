import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { TaxonomyContext } from "../context/context";
import { Button, Nav } from "react-bootstrap";
export class ConfigPage extends Component {
  render() {
    return (
      <div>
        
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/config/slot">
              Slots
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/admin/config/${this.context.url}`}>
              {this.context.resources}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>

              <Nav.Item>
                <Nav.Link
                    as={Link}
                    to="/admin/config/resources/taxonomy"
                >
                  Taxonomy
                </Nav.Link>
              </Nav.Item>

          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default ConfigPage;

ConfigPage.contextType = TaxonomyContext