import { IProduct } from "../../model/Product";
import { IRepositoryProduct } from "../../../interfaceAdapters/ports/IRepositoryProduct";
import { InvalidPriceError } from "../../exceptions/InvalidPriceError";

export class CreateProductsUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    execute(product: IProduct): Promise<IProduct> {
        if(parseFloat(product.price) <= 0) {
            throw new InvalidPriceError()
        }
        return this.repository.save(product);
    }
}