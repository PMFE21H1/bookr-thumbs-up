let regexpDate = "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2})$";
console.log(("2017-01-01T20:00").match(regexpDate));

class Reservation{
    constructor(customer,resource,slot,id) {
        if(!customer || typeof customer != "string"){
            throw new Error("Customer declaration invalid")
        }
        if(!resource || typeof resource != "string"){
            throw new Error("Bad resource declaration!")
        }
        if(!slot || !slot.match(regexpDate)){
            throw new Error("Bad slot declaration!")
        }
        this.id = ""
        this.customer = customer
        this.resource =resource
        this.slot = slot
    }
}