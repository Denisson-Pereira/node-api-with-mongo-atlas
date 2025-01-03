import { IRepositoryProduct } from "../../ports/IRepositoryProduct";
import { InvalidIdError } from "../../exceptions/InvalidIdError";

export class DeleteProductByIdUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    execute(id: string): Promise<string> {
        if (!id) {
            throw new InvalidIdError();
        }
        return this.repository.deleteById(id);
    }
}