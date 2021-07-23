import React from 'react'

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

            fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json", {
                body: JSON.stringify({
                    start:this.state.slotConfig.start,
                    end:this.state.slotConfig.end,
                    duration:this.state.slotConfig.duration
                }),
                method: "PUT"
            })

    }

    render() {
        return (
                <form>
                    <label htmlFor="">Start Time</label>
                    <input type="time" onChange={(e) => this.changeStartTime(e)}/>
                    <label htmlFor="">End Time</label>
                    <input type="time" onChange={(e) => this.changeEndTime(e)}/>
                    <label htmlFor="">Slot Duration (minutes)</label>
                    <input type="number" onChange={(e) => this.changeDuration(e)}/>
                    <button onClick={(e) =>this.setSlot(e)}>Set slot</button>
                </form>
        )
    }
}