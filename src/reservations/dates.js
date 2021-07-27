
export const DAYMILLISEX = 1000*60*60*24

export function dayName (day){
    let daynames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    let d = new Date(day)
    let dayIndex = d.getDay()
    return daynames[dayIndex]
}

export function calcWeekStart (){
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

export function nextDayStart (day){
    console.log(day)
    return new Date(day.getTime()+DAYMILLISEX)
  
}

export function constructTimestamp(date, time) {
  return `${date}T${time}`;
}