import { IRepositoryCategory } from "../../ports/IRepositoryCategory";
import { InvalidIdError } from "../../exceptions/InvalidIdError";

export class DeleteCategoryByIdUseCase {
    private repository: IRepositoryCategory;

    constructor(repository: IRepositoryCategory) {
        this.repository = repository;
    }

    execute(id: string): Promise<string> {
        if (!id) {
            throw new InvalidIdError();
        }
        return this.repository.deleteById(id);
    }
}