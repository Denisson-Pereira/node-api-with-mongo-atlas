import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class DeleteProductByIdUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(id: string): Promise<string> {
        return this.repository.deleteById(id);
    }
}