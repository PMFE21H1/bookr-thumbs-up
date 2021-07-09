import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAwb3sJwSz3XL1SJP2okwE49g_Q4oHmeS4",
    authDomain: "bookr-thumbs-up.firebaseapp.com",
    databaseURL: "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bookr-thumbs-up",
    storageBucket: "bookr-thumbs-up.appspot.com",
    messagingSenderId: "867285693313",
    appId: "1:867285693313:web:caf955c1ac2cd79d3fae80",
    measurementId: "G-CCWPS19RXP"
}

const firebaseApp = initializeApp(firebaseConfig);

export function createResource(resource){
    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources.json", {
        body: JSON.stringify(resource),
        method: "POST"
    })
}



export class Resource {
    constructor(name, id) {
        if(!name) throw new Error('Name can not be empty')
        this.name = name;
        this.id = id;
    }
}




export function deleteResource(resource){
    if (!resource.id) {
        throw new Error("invalid ID")
    }

    let deleteReservations=[];

    fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json`)
        .then(response=>response.json())
        .then(reservations=>{
            Object.keys(reservations).forEach(reservation=>{
                if(reservations[reservation].resource === resource.id){
                    reservations[reservation].id=reservation;
                    deleteReservations=[...deleteReservations,reservations[reservation]]
                }
            })}).then(()=>console.log(deleteReservations))
        .then(()=>{for(let i=0; i<deleteReservations.length; i++) {
            fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${deleteReservations[i].id}.json`, {
                method: "DELETE"
            })
        }})
        .then(()=> fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${resource.id}.json`, {
            method: "DELETE"
        }))
        .then(response=>{if(response===null){return true}})

}