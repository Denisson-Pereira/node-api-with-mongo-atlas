import { IProduct } from "../model/Product";
import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class GetAllProductsUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(): Promise<IProduct[]> {
        return this.repository.getAllProducts();
    }
    
}