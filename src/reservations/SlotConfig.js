import React from 'react'
import {Link} from "react-router-dom";
import {configSlot} from "./reservations"
import Swal from 'sweetalert2';

export default class SlotConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slotConfig: {
                start: "",
                end: "",
                duration: ""

            }
        }
    }

    changeStartTime = (e) => {
        this.setState({
            slotConfig: {...this.state.slotConfig, start: e.target.value}
        })
    }
    changeEndTime = (e) => {
        this.setState({
            slotConfig: {...this.state.slotConfig, end: e.target.value}
        })
    }
    changeDuration = (e) => {
        this.setState({
            slotConfig: {...this.state.slotConfig, duration: e.target.value}
        })
    }
    setSlot=(e)=>{
        e.preventDefault();
        try{
            configSlot(this.state.slotConfig.start, this.state.slotConfig.end, this.state.slotConfig.duration)
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
            <>
                <form>
                    <label htmlFor="">Start Time</label>
                    <input type="time" onChange={(e) => this.changeStartTime(e)}/>
                    <label htmlFor="">End Time</label>
                    <input type="time" onChange={(e) => this.changeEndTime(e)}/>
                    <label htmlFor="">Slot Duration (minutes)</label>
                    <input type="number" onChange={(e) => this.changeDuration(e)}/>
                    <button onClick={(e) =>this.setSlot(e)}>Set slot</button>
                </form>
                <Link to="/admin/config/slot/availability">Unavailability</Link>
            </>
        )
    }
}