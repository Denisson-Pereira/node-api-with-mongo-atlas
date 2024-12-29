import { IRepositoryProduct } from "../../../interfaceAdapters/ports/IRepositoryProduct";
import { InvalidIdError } from "../../exceptions/InvalidIdError";

export class DeleteProductByIdUseCase {
    private repository: IRepositoryProduct;

    constructor(repository: IRepositoryProduct) {
        this.repository = repository;
    }

    async execute(id: string): Promise<string> {
        if (!id) {
            throw new InvalidIdError();
        }
        return this.repository.deleteById(id);
    }
}