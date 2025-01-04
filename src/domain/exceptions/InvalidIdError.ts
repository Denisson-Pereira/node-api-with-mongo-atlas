export class InvalidIdError extends Error {
    constructor(message: string = "Id not found!") {
        super(message);
        this.name = "InvalidIdError"; 
    }
}
