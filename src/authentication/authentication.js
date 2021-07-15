export function createUser(customer,) {

                    return fetch("https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations.json", {
                        body: JSON.stringify({customer: customer, slot: slot, resource: resource.id}),
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
                            try {reservation = new Reservation(customer, resource, slot, data.name)} catch (e){alert(e.message)}
                            return reservation
                        })
                }
            })
}