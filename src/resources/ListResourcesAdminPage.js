import { listResources } from './resources'
import { Link } from 'react-router-dom'
import React from 'react'
import {TaxonomyContext} from "../context/context";

class listResourceAdminPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            resources: null
        }
    }

    getResources = () => {
        listResources().then( resources => this.setState({resources: resources}))
    }

    componentDidMount(){
        this.getResources()
    }

render(){
    return(
        <TaxonomyContext.Consumer>
            { (taxonomy)=>{
              return  <>

                    <Link to={`/admin/${taxonomy.url}/create`}>Add resource</Link>

                    <table>
                        <tr>
                            <th>{taxonomy.resource}</th>
                            <th>{taxonomy.resource} ID</th>
                            <th></th>
                        </tr>
                        {
                            this.state.resources ?
                                this.state.resources.map(resource => {
                                    return (
                                        <tr>
                                            <td>{resource.name}</td>
                                            <td>{resource.id}</td>
                                            <td>


                                            </td>

                                            <td><Link
                                                to={`/admin/${taxonomy.url}/${resource.id}/edit`}>EDIT</Link></td>
                                            <td><Link to={`/admin/${taxonomy.url}/${resource.id}/delete`}>DELETE</Link></td>
                                        </tr>)
                                })
                                :
                                <p></p>
                        }

                    </table>

                </>
            }

            }
        </TaxonomyContext.Consumer>
        )
    }
}

export default listResourceAdminPage