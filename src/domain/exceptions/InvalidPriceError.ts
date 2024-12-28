export class InvalidPriceError extends Error {
    public statusCode: number;
    
    constructor() {
        super("Price is not valid!");
        this.statusCode = 400;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
