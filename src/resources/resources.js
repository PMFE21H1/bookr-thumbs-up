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

 // const firebaseApp = initializeApp(firebaseConfig);

export function createResource(resource) {
    if(resource instanceof  Resource){
        if(!resource.id){
        return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources.json", {
            body: JSON.stringify(resource),
            method: "POST"
        }).then(response => {
            if(response.status === 200){
                alert("Successful resource creation!")
            } else {
                alert("Unsuccessful!")
            }

            return response.json()})
            .then(data => {
            resource.id = data.name
            return resource
        })
        }else{
            throw new Error("Id already exists!");
        }

    }else{
        throw new Error("The parameter is not a Resource!");
    }
    }

export class Resource {
    constructor(name, id) {
        if (!name) throw new Error('Name can not be empty')
        this.name = name;
        this.id = id;
    }
}

export function listResources(){
    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources.json")
    .then(resp => resp.json())
    .then(resources => {
        
       return Object.keys(resources).map((key) => {
            resources[key].id = key
        return resources[key]
            })
        }
    )
}

