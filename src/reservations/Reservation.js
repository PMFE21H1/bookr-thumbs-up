

export class Reservation{
    constructor(customer,resource,slot,id) {
        if(!customer || typeof customer != "string"){
            throw new Error("Customer declaration invalid")
        }
        if(!resource ){
            throw new Error("Bad resource declaration!")
        }
        if(!slot || !slot.match("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$")){
            throw new Error("Bad slot declaration!")
        }
        this.id = ""
        this.customer = customer
        this.resource =resource
        this.slot = slot
    }
}