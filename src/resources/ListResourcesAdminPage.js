import { listResources } from './resources'
import { Link } from 'react-router-dom'
import React from 'react'

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
        <>
    
        <table>
            <tr>
                <th>Resource Name</th><th>Resource ID</th><th></th>
            </tr>
                {
                this.state.resources ?
                this.state.resources.map(resource => {
                    return (
                    <tr>
                        <td>{resource.name}</td>
                        <td>{resource.id}</td>
                        <td>

                            <button>edit</button>
                            <button>delete</button>
                            
                        </td>

                        {/* <td><Link to="/admin/resource/:resourceID">{resource.name}</Link></td>
                        <td><Link to="/admin/resource/:resourceID">{resource.id}</Link></td> */}
                    </tr>)
                })
            :
                <p></p>
            }
            
        </table>
        <button>Add resource</button>
        </>
        
        )
    }
}

export default listResourceAdminPage