import React, { Component } from 'react'

export default class CreateReservationPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            resource: "",
            customer:"",
            date:"",
            time:"",

            
        }
    }

    componentDidMount(){
        
    }

    changeName = (e) => {
        this.setState({name: e.target.value})
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

                    </select>
                </div>

                <div>
                    <label>Customer:</label>
                    <input onChange={(e)=>this.changeName(e)} value={this.state.name}></input>
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" onChange={(e)=>this.changeDate(e)} value={this.state.name}></input>
                </div>

                <div>
                    <label>Time:</label>
                    <input type="time" onChange={(e)=>this.changeTime(e)} value={this.state.name}></input>
                </div>

                <button>Create</button>
                <button>Cancel</button>

            </>
        )
    }
}
