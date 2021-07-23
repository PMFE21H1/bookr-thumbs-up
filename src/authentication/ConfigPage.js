import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { TaxonomyContext } from "../context/context";


export class ConfigPage extends Component {
  render() {
    return (
      <div>
        <Link to='/admin/config/slot'>Slots</Link>
        <Link to={`/admin/config/${this.context.resources}`}>{this.context.resources}</Link>
        <Link to='/admin/config/site'>Site</Link>

      </div>
    );
  }
}

export default ConfigPage;

ConfigPage.contextType = TaxonomyContext