import React from "react";
import timeslotter from "time-slotter"
import {listReservations} from "./reservations";
import { DAYMILLISEX, nextDayStart, dayName, calcWeekStart } from "./dates";


export default class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state ={
            startDay: calcWeekStart(),
            slotArr: []
        }
    }

    previousWeek=()=>{
        this.setState({
            startDay: new Date(this.state.startDay.getTime() - DAYMILLISEX * 7)
        })
    }

    nextWeek=()=>{
        this.setState({
            startDay: new Date(this.state.startDay.getTime() + DAYMILLISEX * 7)
        })
    }


    render() {
        let weekStart = this.state.startDay
        let daydates = [weekStart]
        for(let i = 1; i <= 6; i++){
            let nextDay = nextDayStart(daydates[i-1])
            daydates.push(nextDay)
        }


        let days = daydates.map(daydate => ({
            text: daydate.toISOString(),
            slots: this.props.slotArr.map(slotData => {
                let slotStart = `${daydate.toISOString().split("T")[0]}T${slotData.split("-")[0]}`
                console.log(this.props.reservations)
                //emlékeztető: a reserved slotokon belül két külön eset a reserved és a pending
                if(this.props.reservations.find(r => r.slot == slotStart))return slotStart + "(reserved)"
                //idejön majd egy másik if-be az unavailable slot vizsgálat meg a pending
                return slotStart
            })


        }))



        return (
            //a next gomb hasonló módon függ működni csak nem kivonjuk hanem hozzáadjuk a heti millisexet
            <>  <button onClick={this.previousWeek}>Previous</button>
                {days.map(day =>
                    <div>
                        <div>
                            {day.text}
                            <br/>{dayName(day)}
                        </div>
                        {/* itt kell majd átirni hogy ne direkt módon jelenitsük meg a slotot hanem a css classt és szöveget egy objectben kapjuk meg*/}
                        {day.slots.map(slot => <div>{slot}</div>)}
                    </div>)
                }
            </>
        )
    }

}