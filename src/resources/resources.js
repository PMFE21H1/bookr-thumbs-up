import { initializeApp } from "firebase/app";
import Swal from "sweetalert2";
import {deleteReservation} from "../reservations/reservations"

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

export function createResource(resource) {
  if (resource instanceof Resource) {
    if (!resource.id) {
      return fetch(
        "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources.json",
        {
          body: JSON.stringify(resource),
          method: "POST",
        }
      )
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Successful resource creation!",
              text: "You have created a resource.",
              icon: "success",
              confirmButtonText:"OK"})
          } else {
            Swal.fire({
              title: "Failed to create a resource!",
              text: `Check if you have filled all required fields!`,
              icon: "error",
              confirmButtonText:"OK"});
          }

                    return response.json();
                })
                .then((data) => {
                    resource.id = data.name;
                    return resource;
                });
        } else {
            throw new Error("Id already exists!");
        }
    } else {
        throw new Error("The parameter is not a Resource!");
    }
}

export class Resource {
    //a resource classt kiegeszitettuk egy bemeno parameterrel
    constructor(name, description, imgUrl, id) {
        if (!name) throw new Error("Name can not be empty");
        this.name = name;
        this.id = id;
        this.imgUrl = imgUrl;
        this.description = description;
    }
}

export function deleteResource(resource) {

    let deleteReservations = [];

    return fetch(
        `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json`
    )
        .then((response) => response.json())
        .then((reservations) => {
            Object.keys(reservations).forEach((reservation) => {
                if (reservations[reservation].resource === resource.id) {
                    reservations[reservation].id = reservation;
                    deleteReservations = [
                        ...deleteReservations,
                        reservations[reservation],
                    ];
                }
            });
        })
        .then(() => console.log(deleteReservations))
        .then(() => {
            for (let i = 0; i < deleteReservations.length; i++) {
                deleteReservation(deleteReservations[i].id)
            }
        })
        .then(() =>
            fetch(
                `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${resource.id}.json`,
                {
                    method: "DELETE",
                }
            )
        )
        .then((response) => {
            return true;
        });
}

export function listResources() {
    return fetch(
        "https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources.json"
    )
        .then((resp) => resp.json())
        .then((resources) => {
            return Object.keys(resources).map((key) => {
                resources[key].id = key;
                return resources[key];
            });
        });
}

export function updateResource(id, patch) {
    if (!id) {
        throw new Error("Id is invalid");
    }
    if (!patch.name) {
        throw new Error("Name can not be empty");
    }
    return listResources().then((resources) => {
        for (let i = 0; i < resources.length; i++) {
            if (resources[i].id === id) {
                return fetch(
                    `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/resources/${id}.json`,
                    {
                        body: JSON.stringify(patch),
                        method: "PATCH",
                    }
                )
                    .then((response) => response.json())

          .then((patchedObject) => {
            Swal.fire({
              title: "Success!",
              text: "Resource succesfully changed : " + patchedObject.name,
              icon: "success",
              confirmButtonText:"OK"})
            return patchedObject
          })
      }
    };
  });
}
