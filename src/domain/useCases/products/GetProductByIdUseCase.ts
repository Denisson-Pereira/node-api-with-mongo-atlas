import { IProduct } from "../../model/Product";
import { IRepositoryProduct } from "../../../interfaceAdapters/ports/IRepositoryProduct";

export class GetProductByIdUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    execute(id: string): Promise<IProduct | null> {
        return this.repository.getProductById(id);
    }
}