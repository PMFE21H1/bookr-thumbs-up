import React, { Component } from 'react'
import { listResources, Resource } from '../resources/resources'
import { createReservation } from './reservations'

export default class CreateReservationPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            resourceToSubmit: {},
            resource:"",
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
                    return {resources: [...this.state.resources, resource]}
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
        this.state.resources.forEach(resource => {
           if (resource.id === e.target.value){
            this.setState({resourceToSubmit: resource, resource:resource.id})
           } 
        })
    }

    changeToDefault = () => {
        this.setState({
            resource:"",
            customer:"",
            date:"",
            time:"",
        })
    }
 
    render() {

        return (
            <>
            <form>

                <h3>Create Reservation</h3>

                <div>
                    
                    <label>Resource:</label>
                    <select onChange={e =>this.changeResource(e)} value={this.state.resource}>
                        <option value={null}>Select a resource</option>

                        {(this.state.resources!==[]) ?

                            this.state.resources.map(resource => 
                                <option key={resource.id} value={resource.id}>{resource.name}</option>
                            )
                      
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
                    (e) => {
                    e.preventDefault();


                    try {createReservation(this.state.customer, `${this.state.date}T${this.state.time}`, this.state.resourceToSubmit)
                    } catch(e) {alert(e.message)}
                    
                    this.changeToDefault()
                }
                }>Create</button>

                <button>Cancel</button>

                </form>
            </>
        )
    }
}
