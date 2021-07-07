export class Resource {
    constructor(name, id) {
        if(!name) throw new Error('Name can not be empty')
        this.name = name;
        this.id = id;
    }
}