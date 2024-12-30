import { IRepositoryCategory } from "../../../interfaceAdapters/ports/IRepositoryCategory";
import { ICategory } from "../../model/Category";

export class PutCategoryUseCase {
    private repository: IRepositoryCategory;

    constructor(repository: IRepositoryCategory) {
        this.repository = repository;
    }

    execute(id: string, category: ICategory): Promise<ICategory | null> {
        return this.repository.update(id, category);
    }
}