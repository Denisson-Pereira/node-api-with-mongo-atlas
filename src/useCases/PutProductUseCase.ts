import { IProduct } from "../model/Product";
import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class PutProductUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(id: string, product: IProduct): Promise<IProduct | null> {
        return this.repository.update(id, product);
    }
}