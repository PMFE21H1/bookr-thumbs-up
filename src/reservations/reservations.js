import {initializeApp} from "firebase/app";
import { getUserByUid } from "../authentication/authentication";
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

export function createReservation(reservation) {

    if (!(reservation instanceof Reservation)) throw new Error('reservation is not instanceof Reservation')

    //reservation-ok lekérése, annak leellenőrzése, hogy van e már erre az időpontra és resource-ra foglalás
    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json")
        .then(response => response.json())
        .then(reservations => {
            let exists = false
            for (let k in reservations) {

                if (reservations[k].resource === reservation.resource && reservations[k].slot === reservation.slot) {
                    exists = true
                    throw new Error("No available slot for this spot!")
                }
            }
            //új reservation létrehozása
            if (!exists) {
                //posttal elküldjük az adatokat a firebasre
                return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json", {
                    body: JSON.stringify({
                        customerUid: reservation.customerUid,
                        slot: reservation.slot,
                        resource: reservation.resource,
                        status: reservation.status
                    }),
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
                    //user reservation tömbbe belerakjuk az új reservation ID-t
                    .then(data => {

                        return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users/${reservation.customerUid}/reservations.json`)

                            .then(response => response.json())
                            .then(data2 => {
                                if (data2 === null) {
                                    data2 = [data.name]
                                } else {
                                    data2.push(data.name);

                                }
                                return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users/${reservation.customerUid}/reservations.json`,
                                    {
                                        body: JSON.stringify(data2),
                                        method: "PUT"
                                    }
                                )
                            })
                    })
            }
        })
}


export function updateReservation(id, newData) {
    if (!newData.customerUid) {
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
        if (k !== "slot" && k !== "customerUid" && k !== "resource") {
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
            response => response.json()).then(updatedObject => alert('successful update: ' + updatedObject.customerUid)))


}


export class Reservation {
    constructor(customerUid, resource, slot, status, id) {
        if (!customerUid || typeof customerUid != "string") {
            throw new Error("Customer declaration invalid")
        }
        if (!resource) {
            throw new Error("Bad resource declaration!")
        }
        if (!slot || !slot.match("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$")) {
            throw new Error("Bad slot declaration!")
        }
        this.id = ""
        this.customerUid = customerUid
        this.resource = resource
        this.slot = slot
        this.status = status


    }
}

//////////////////////////////////

export function deleteReservation(id){
    if (!id) throw new Error("ID can not be empty");
    let reservationToDelete={}
    let usersReservations=[]

return fetch (`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`)
    .then(resp => resp.json())
    .then(reservation => {
        console.log(reservation)
        //reservaton: {customerUid: "a7HopzvmBQdb9ITF8S4Nh3JRsm93", resource: "-Mf2gShmbf3-lVHzgA5d", slot: "2021-07-16T14:00", status: "confirmed"}
        return reservationToDelete=reservation
        //bekerült
    })
    .then(reservationToDelete => getUsersReservationsByUid(reservationToDelete.customerUid))
    .then(reservations => {
        return usersReservations = reservations
    })
    .then(reservations => {
        console.log(usersReservations)
        let idx = usersReservations.indexOf(id)
        if (idx > -1){
            usersReservations.splice(idx, 1)
            console.log(usersReservations)
            return UpdateUsersReservationsArray(reservationToDelete.customerUid, usersReservations)
        } else {
            throw new Error('The reservation cannot be found')
        }
    })
    .then(() => {
        console.log(id)
        return deleteReservationFromDatabase(id)})
    .catch((e)=> alert(e.message))
}

function UpdateUsersReservationsArray(uid, array){
    return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/reservations.json`,
                    {
                        body: JSON.stringify(array),
                        method: "PUT"
                    }
                )
}

function deleteReservationFromDatabase(id) {
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

function getUsersReservationsByUid(uid){
    let usersReservations=[]
    return fetch(
        `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/reservations.json`
    )
    .then(resp => resp.json())
    .then(reservations => {return usersReservations = reservations})
}

export function confirmReservation(reservationId) {
    return fetch(
        `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${reservationId}.json`,
        {
            body: JSON.stringify({status: "confirmed"}),
            method: "PATCH"
        }
    )

}

///////////////////////////////////////

export function listUsersReservations(user) {
    return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}/reservations.json`)
        .then(response => response.json())
        .then(async (reservationArr) => {
                if (reservationArr === null) {
                    return []
                } else {
                    let searchedReservations = [];
                    for (let i = 0; i < reservationArr.length; i++) {
                        await fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${reservationArr[i]}.json`)
                            .then(response => response.json())
                            .then(reservation => {
                                    reservation.id = reservationArr[i];
                                    return searchedReservations.push(reservation)
                                }
                            )
                            
                    }
                    return searchedReservations
                }

            }
        )

}

