import React from "react";
import timeslotter from "time-slotter"
import {listReservations} from "./reservations";


const DAYMILLISEX = 1000*60*60*24

function dayName (day){
    let daynames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    let d = new Date(day)
    let dayIndex = d.getDay()
    return daynames[dayIndex]
}

function calcWeekStart (){

    let d = new Date()
    let current = d.getTime()
    let day = d.getDay()
    while (day != 1){
        current = current - DAYMILLISEX
        d = new Date(current)
        day = d.getDay()
    }
    return d

}

function nextDayStart (day){

    console.log(day)
    return new Date(day.getTime()+DAYMILLISEX)


}


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            startDay: calcWeekStart(),
            slotArr: []
        }

    }

    timeSlot=()=>{
        let timeSlotter = require('time-slotter');

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



    componentDidMount() {    //be kell tölteni az unavailable slotokat
        fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/slotConfig.json")
            .then(response=>response.json())
            .then(slotConfig=>{
                listReservations().then(reservations => reservations.filter(r => r.resource == this.props.resourceId) )
                    .then(filteredReservations => {
                        let generatedSlotArr=[];
                        let timeSlotter = require('time-slotter');
                        timeSlotter(slotConfig.start, slotConfig.end, parseInt(slotConfig.duration))
                            .forEach(slotArr=>{
                                let slot=`${slotArr[0]}-${slotArr[1]}`
                                generatedSlotArr.push(slot);
                                console.log(slotArr[0])
                            })
                        this.setState({slotArr:generatedSlotArr , reservations: filteredReservations })
                    })

                }
            ).then(()=>console.log(this.state.slotArr))


    }


    render() {

        let weekStart = this.state.startDay
        let daydates = [weekStart]
        for(let i = 1; i <= 6; i++){
            let nextDay = nextDayStart(daydates[i-1])
            daydates.push(nextDay)
        }


        let days = daydates.map(daydate => ({
            day: daydate.toISOString(),
            slots: this.state.slotArr.map(slotData => {
                let slotStart = `${daydate.toISOString().split("T")[0]}T${slotData.split("-")[0]}`
                console.log(this.state.reservations)
                //emlékeztető: a reserved slotokon belül két külön eset a reserved és a pending
                if(this.state.reservations.find(r => r.slot == slotStart))return slotStart + "(reserved)"
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
                            {day.day}
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