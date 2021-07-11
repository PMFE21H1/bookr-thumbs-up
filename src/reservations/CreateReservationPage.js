import React, { Component } from 'react'
import { listResources } from '../resources/resources'
// import { createReservation } from './reservations'

export default class CreateReservationPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            resource: "",
            customer:"",
            date:"",
            time:"",
            resources:[]

            
        }
    }

    componentDidMount(){
        listResources().then(resourcesArr => resourcesArr.map(
            resource => {
                this.setState(() => {
                    return {resources: [...this.state.resources, resource.name]}
                })
            }
        ))   
    }

    changeCustomer = (e) => {
        this.setState({customer: e.target.value})
    }

    changeDate = (e) => {
        this.setState({date: e.target.value})
    }

    changeTime = (e) => {
        this.setState({time: e.target.value})
    }

    changeResource = (e) => {
        this.setState({resource: e.target.value})
    }
 
    render() {

        return (
            <>
                <div>
                    <label>Resource:</label>
                    <select onChange={e =>this.changeResource(e)} value={this.state.resource}>
                        <option value={null}>Select a resource</option>

                        {this.state.resources ?
                    this.state.resources.map((resource, i) => {
                        return <option key={i} value={resource}>{resource}</option>
                    })    
                    :
                    ""
                    
                    
                    }
                    
                    </select>
                </div>

                <div>
                    <label>Customer:</label>
                    <input onChange={(e)=>this.changeCustomer(e)} value={this.state.customer}></input>
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" onChange={(e)=>this.changeDate(e)} value={this.state.date}></input>
                </div>

                <div>
                    <label>Time:</label>
                    <input type="time" onChange={(e)=>this.changeTime(e)} value={this.state.time}></input>
                </div>

                <button onClick={
                    () => {
                    console.log(this.state.resource)
                    console.log(`${this.state.date}T${this.state.time}`)
                    console.log(this.state.customer)
                    // createReservation(this.state.resource, `${this.state.date}T${this.state.time}`, this.state.customer)
                }
            }>Create</button>
                <button>Cancel</button>

            </>
        )
    }
}
