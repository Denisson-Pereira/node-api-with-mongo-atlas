export class InvalidIdError extends Error {
    public statusCode: number;

    constructor(message: string = "Id not found!") {
        super(message);
        this.name = "InvalidIdError"; 
        this.statusCode = 400;
    }
}
