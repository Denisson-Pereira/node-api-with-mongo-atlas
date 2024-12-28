export class InvalidIdError extends Error {
    public statusCode: number;
    
    constructor() {
        super("Id not found!");
        this.statusCode = 404;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
