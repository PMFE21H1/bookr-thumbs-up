import {initializeApp} from "firebase/app";
import {Resource} from "../resources/resources";

const firebaseConfig = {
    apiKey: "AIzaSyAwb3sJwSz3XL1SJP2okwE49g_Q4oHmeS4",
    authDomain: "bookr-thumbs-up.firebaseapp.com",
    databaseURL:
        "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bookr-thumbs-up",
    storageBucket: "bookr-thumbs-up.appspot.com",
    messagingSenderId: "867285693313",
    appId: "1:867285693313:web:caf955c1ac2cd79d3fae80",
    measurementId: "G-CCWPS19RXP",
};

const firebaseApp = initializeApp(firebaseConfig);

export function listReservations() {
    return fetch(
        "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json"
    )
        .then((resp) => resp.json())
        .then((reservations) => {
            return Object.keys(reservations).map((key) => {
                reservations[key].id = key;
                return reservations[key];
            });
        });


}

export function createReservation(customer, slot, resource) {
    if (!customer) throw new Error('Customer can not be empty')


        return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json")
            .then(response => response.json())
            .then(reservations => {
                let exists = false
                for (let k in reservations) {

                    if (reservations[k].resource === resource.id && reservations[k].slot === slot) {
                        exists = true
                        throw new Error("No available slot for this spot!")
                    }
                }
                if (!exists) {
                    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json", {
                        body: JSON.stringify({customer: customer, slot: slot, resource: resource.id}),
                        method: "POST"
                    }).then(response => {
                        if (response.status === 200) {
                            alert("Successful reservation creation!")
                        } else {
                            alert("Unsuccessful!")
                        }

                        return response.json()
                    })
                        .then(data => {
                            let reservation;
                            try {reservation = new Reservation(customer, resource, slot, data.name)} catch (e){alert(e.message)}
                            return reservation
                        })
                }
            })


}


export function updateReservation(id, newData) {
    if (id == undefined) {
        throw new Error("Id was invalid")
    }

    if (newData == undefined) {
        throw new Error("Update is invalid")
    }

    for (let k in newData) {
        if (k !== "slot" && k !== "customer") {
            throw new Error("Partial update is invalid")
        }
    }

    return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`, {
        body: JSON.stringify(newData),
        method: "PATCH"
    }).then(response => response.json()).then(() =>
        fetch(
            `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`, {
                method: "GET"
            }).then(
            response => response.json()).then(updatedObject => console.log(updatedObject)))


}


export class Reservation{
    constructor(customer,resource,slot,id) {
        if(!customer || typeof customer != "string"){
            throw new Error("Customer declaration invalid")
        }
        if(!resource ){
            throw new Error("Bad resource declaration!")
        }
        if (!slot || !slot.match("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$")) {
            throw new Error("Bad slot declaration!")
        }
        this.id = ""
        this.customer = customer
        this.resource = resource
        this.slot = slot
    }
}

export function deleteReservation(id) {
    if (!id) throw new Error("Id can not be empty");
    return fetch(
        `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
        {
            method: "DELETE",
        }
    )
        .then((response) => response.json())
        .then((deletedReservation) =>
            console.log(deletedReservation)
        );
}


