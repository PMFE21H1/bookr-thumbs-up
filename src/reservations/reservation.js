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




export function updateReservation(id, newData) {
    if (id == undefined) {
        throw new Error("Id was invalid")
    }

    if (newData == undefined ) {
        throw new Error("Update is invalid")
    }

    for(let k in newData){
        if( k !== "slot" && k !== "customer" ){
            throw new Error("Partial update is invalid")
        }
    }

    return fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`, {
        body: JSON.stringify(newData) ,
        method: "PATCH"
    }).then(response => response.json()).then(() =>
        fetch(
            `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,{
                method: "GET"
            } ).then(
            response => response.json()).then(updatedObject => console.log(updatedObject)))


}

