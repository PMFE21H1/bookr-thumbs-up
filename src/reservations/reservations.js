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
    //reservation-ok lekérése
    return fetch(
        "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json"
    )
        .then((resp) => resp.json())
        .then((reservations) => {
            // tömböt hoz létre a lekért objectek kulcsaival, majd végig megy a tömbön
            return Object.keys(reservations).map((key) => {
            // a map létrehoz egy tömböt, amibe az eredeti objecteket rakja, a hozzájuk tartozó ID beleírásával
                reservations[key].id = key;
            // Az újonnan létrehozott objectet adja vissza és teszi bele a map által visszaadott tömbbe.
                return reservations[key];
            });
        });


}

export function createReservation(customer, slot, resource,status) {
    //ellenőrzi, hogy van-e customer
    if (!customer) throw new Error('Customer can not be empty')

        //reservation-ok lekérése, annak leellenőrzése, hogy van e már erre az időpontra és resource-ra foglalás
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
                //új reservation létrehozása
                if (!exists) {
                    //posttal elküldjük az adatokat a firebasre
                    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json", {
                        body: JSON.stringify({customer: customer, slot: slot, resource: resource.id, status: status}),
                        method: "POST"
                    }).then(response => {
                        //response-ból kiolvassuk a státuszkódot, és az alapján adunk vissza alert message-et
                        if (response.status === 200) {
                            alert("Successful reservation creation!")
                        } else {
                            alert("Unsuccessful!")
                        }

                        return response.json()
                    })
                        //itt jön létre az új reservation a Reservation class használatával
                        .then(data => {
                            let reservation;
                            try {reservation = new Reservation(customer, resource, slot,status, data.name)} catch (e){alert(e.message)}
                            //New reservation nem lehetne paraméternek megadni a functionnél?
                            return reservation
                        })
                }
            })
}


export function updateReservation(id, newData) {
    if (!newData.customer) {
        throw new Error('Customer can not be empty')
    }
    if (!newData.slot.match("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$")) {
        throw new Error('Slot is invalid')
    }
    if (id == undefined) {
        throw new Error("Id was invalid")
    }

    if (newData == undefined) {
        throw new Error("Update is invalid")
    }

    for (let k in newData) {
        if (k !== "slot" && k !== "customer" && k !== "resource") {
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
            response => response.json()).then(updatedObject => alert('successful update: ' + updatedObject.customer)))


}


export class Reservation{
    constructor(customer,resource,slot,status,id) {
        //ellenőrzi a customer formátumát
        if(!customer || typeof customer != "string"){
            throw new Error("Customer declaration invalid")
        }
        //ellenőrzi, hogy van-e resource
        if(!resource){
            throw new Error("Bad resource declaration!")
        }
        //a slot formátumát ellenőrzi
        if (!slot || !slot.match("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$")) {
            throw new Error("Bad slot declaration!")
        }
        //az id-t nem itt adjuk meg, mert azt a firebase generálja
        this.id = ""
        this.customer = customer
        this.resource = resource
        this.slot = slot
        this.status= status


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


