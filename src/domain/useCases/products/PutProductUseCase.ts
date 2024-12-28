import { IProduct } from "../../model/Product";
import { IRepositoryProduct } from "../../../ports/IRepositoryProduct";
import { InvalidPriceError } from "../../exceptions/InvalidPriceError";

export class PutProductUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(id: string, product: IProduct): Promise<IProduct | null> {
        if (parseFloat(product.price) <= 0) {
            throw new InvalidPriceError();
        }
        return this.repository.update(id, product);
    }
}