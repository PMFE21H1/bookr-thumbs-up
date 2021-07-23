import React, { Component } from "react";
import { Link } from 'react-router-dom'
export class ConfigPage extends Component {
  render() {
    return (
      <div>
        {/* - Slots: /admin/config/slot - Resources: /admin/config/resources
        (previously: /admin/resources) - Site: /admin/config/site */}

        <Link to='/admin/config/slot'>Slots</Link>
        <Link to='/admin/config/resources'>Resources</Link>
        <Link to='/admin/config/site'>Site</Link>

      </div>
    );
  }
}

export default ConfigPage;
