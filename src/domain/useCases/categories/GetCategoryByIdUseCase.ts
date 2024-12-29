import { IRepositoryCategory } from "../../../interfaceAdapters/ports/IRepositoryCategory";
import { ICategory } from "../../model/Category";

export class GetCategoryByIdUseCase {
    private repository: IRepositoryCategory;

    constructor(repository: IRepositoryCategory) {
        this.repository = repository;
    }

    execute(id: string): Promise<ICategory | null> {
        return this.repository.getCategoryById(id);
    }
}