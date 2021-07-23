import React, { Component } from "react";
import { Link } from 'react-router-dom'


export class ConfigPage extends Component {
  render() {
    return (
      <div>
        <Link to='/admin/config/slot'>Slots</Link>
        <Link to='/admin/config/resources'>Resources</Link>
        <Link to='/admin/config/site'>Site</Link>

      </div>
    );
  }
}

export default ConfigPage;
