import React from "react";
import timeSlotter from "time-slotter";
import { DAYMILLISEX, nextDayStart, dayName, calcWeekStart, constructTimestamp, extractDay, extractTime } from "../dates";
import "./calendar.css"


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
        let from = this.props.slotStart;
        let until = this.props.slotEnd;
        let duration = parseInt(this.props.slotDuration);

        let possibleSlots = calcPossibleSlots(from, until, duration)

        let weekStart = this.state.startDay
        let reservations = this.props.reservations;

        let slots = calcActualSlots(reservations, possibleSlots, weekStart);



        return (
            //a next gomb hasonló módon függ működni csak nem kivonjuk hanem hozzáadjuk a heti millisexet
            <div className="calendar-container">
                <button onClick={this.previousWeek}>Previous</button>
                <div className="slots-container">
                    {slots.map(day =>
                        <div>
                            <div>
                                {day.text}
                                <br/>{dayName(day)}
                            </div>
                            {/* itt kell majd átirni hogy ne direkt módon jelenitsük meg a slotot hanem a css classt és szöveget egy objectben kapjuk meg*/}
                            {day.slots.map(slot => <div>{slot}</div>)}
                        </div>)
                    }
                </div>
                <button onClick={this.previousWeek}>Next</button>
            </div>
        )

        function calcPossibleSlots(from, until, steps) {
            return timeSlotter(from, until, steps)
                    .map(slotArr=>{
                        let slot=`${slotArr[0]}-${slotArr[1]}`
                        console.log(slotArr[0])
                        return slot;
                    })
        }

        function calcActualSlots(reservations, possibleSlots, weekStart) {
            let weekDays = calcWeekDays(weekStart);
            return weekDays.map(daydate => ({
                text: daydate.toISOString(),
                slots: possibleSlots.map(slot => {
                    let datePart = extractDay(daydate);
                    let timePart = extractTime(slot);
                    let slotStart = constructTimestamp(datePart, timePart);
                    //emlékeztető: a reserved slotokon belül két külön eset a reserved és a pending
    
                    let isReserved = reservations.find(r => r.slot == slotStart);
                    if(isReserved) return slotStart + "(reserved)"
                    //idejön majd egy másik if-be az unavailable slot vizsgálat meg a pending
                    return slotStart
                })
            }))
        }

        function calcWeekDays(from) {
            let days = [from];
            for(let i = 1; i <= 6; i++){
                let next = nextDayStart(days[i-1])
                days.push(next)
            }
            return days;
        }
    }

}