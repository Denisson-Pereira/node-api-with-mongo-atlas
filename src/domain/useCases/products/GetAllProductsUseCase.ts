import { IProduct } from "../../model/Product";
import { IRepositoryProduct } from "../../../interfaceAdapters/ports/IRepositoryProduct";

export class GetAllProductsUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    execute(): Promise<IProduct[]> {
        return this.repository.getAllProducts();
    }
    
}