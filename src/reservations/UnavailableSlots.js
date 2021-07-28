import React from "react"
import {listResources} from "../resources/resources";
import {unavailableSlot} from "./reservations";
import SlotSelector from "./SlotSelector"

export default class UnavailableSlots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            selectedResource:"",
            date:"",
            time:""
        }
    }

    componentDidMount() {
        listResources().then(resourcesArr =>
                this.setState(() => {
                    return {resources: resourcesArr}
                }))

    }

    changeResource = (e) => {
        this.state.resources.forEach(resource => {
            if (resource.id === e.target.value) {
                this.setState({selectedResource: resource.id})
            }
        })
    }

    changeSlot = (date, time) => {
        this.setState(() => {
            return {date: date, time: time}
        })
    }

    sendData=(e)=>{
        e.preventDefault();
        try
        {
            unavailableSlot(this.state.selectedResource, this.state.date, this.state.time)
        }catch (e){
            Swal.fire({
                title: "Failed to made a reservation!",
                text: `${e.message}`,
                icon: "error",
                confirmButtonText:"OK"})
        }
    }

    render() {
        return (
            <form>
                <label>Resource:</label>
                <select onChange={e => this.changeResource(e)} value={this.state.resource}>
                    <option value={null}>Select a resource</option>

                    {this.state.resources.map(resource =>
                        <option key={resource.id} value={resource.id}>{resource.name}</option>

                    )}
                </select>
                <label>Select a slot</label>
                <SlotSelector resource={this.state.selectedResource} changeSlot={this.changeSlot}></SlotSelector>
                <button onClick={(e)=>this.sendData(e)}>Save</button>
            </form>
        )
    }
}