import React, { Component } from 'react'

export class User extends Component {
    constructor(name, email){
        if(!name || typeof name != "string"){
            throw new Error("Name declaration invalid")}

        if(!email || typeof email != "string"){
            throw new Error("Email declaration invalid")}
        this.name = name
        this.email=email
        this.admin=false
    }   
}



export function saveAccountToDatabase(name, email, admin, uid) {

                            return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
                                body: JSON.stringify({name: name, email: email, admin: admin, uid: uid}),
                                method: "POST"
                            }).then(response => {
                                //response-ból kiolvassuk a státuszkódot, és az alapján adunk vissza alert message-et
                                if (response.status === 200) {
                                    alert("Successful user creation!")
                                } else {
                                    alert("Unsuccessful!")
                                }

                                return response.json()
                            })
                                //itt jön létre az új reservation a Reservation class használatával
                                .then(data => {
                                        console.log(data)
                                })
        }