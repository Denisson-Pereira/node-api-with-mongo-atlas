import { IProduct } from "../model/Product";
import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class CreateProductsUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(product: IProduct): Promise<IProduct> {
        return this.repository.save(product);
    }
}