// import { listResources } from './resources'
// import { Link } from 'react-router-dom'
// import React from 'react'

// class listResourceAdminPage extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             resources: null
//         }
//     }

//     getResources = () => {
//         listResources().then( resources => this.setState({resources: resources}))
//     }

//     componentDidMount(){
//         this.getResources()
//     }

// render(){
//     return(
//         <>
//             <Link to="/admin/resources/create">Add resource</Link>

//         <table>
//             <tr>
//                 <th>Resource Name</th><th>Resource ID</th><th></th>
//             </tr>
//                 {
//                 this.state.resources ?
//                 this.state.resources.map(resource => {
//                     return (
//                     <tr>
//                         <td>{resource.name}</td>
//                         <td>{resource.id}</td>
//                         <td>

//                         </td>

//                          <td><Link
//                          to={`/admin/resource/${resource.id}/edit`}>EDIT</Link></td>
//                         <td><Link to={`/admin/resource/${resource.id}/delete`}>DELETE</Link></td>
//                     </tr>)
//                 })
//             :
//                 <p></p>
//             }

//         </table>

//         </>

//         )
//     }
// }

// export default listResourceAdminPage

import { listResources } from "./resources";
import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

class listResourceAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: null,
    };
  }

  getResources = () => {
    listResources().then((resources) =>
      this.setState({ resources: resources })
    );
  };

  componentDidMount() {
    this.getResources();
  }

  render() {
    return (
      <>
        <Link to="/admin/config/resources/create">Add resource</Link>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Resource ID</th>
            </tr>
          </thead>

          {this.state.resources ? (
            this.state.resources.map((resource) => {
              return (
                <tbody>
                  <tr>
                    <td>{resource.name}</td>
                    <td>{resource.id}</td>

                    <td>
                      <Link to={`/admin/config/resource/${resource.id}/edit`}>
                        EDIT
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/config/resource/${resource.id}/delete`}>
                        DELETE
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <p></p>
          )}
        </Table>
      </>
    );
  }
}

export default listResourceAdminPage;
