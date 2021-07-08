import {initializeApp} from 'firebase/app';

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

export function createReservation(reservation) {
    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json", {
        body: JSON.stringify({customer: reservation.customer, slot: reservation.slot, resource: reservation.resource.id}),
        method: "POST"
    }).then(response => response.json()).then(data => {
        reservation.id = data.name
        return reservation
    })
}

export default class Reservation{
    constructor(customer,resource,slot,id) {

        this.customer = customer
        this.resource =resource
        this.slot = slot
        this.id = id;
    }
}

