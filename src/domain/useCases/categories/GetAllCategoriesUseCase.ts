import { IRepositoryCategory } from "../../../interfaceAdapters/ports/IRepositoryCategory";
import { ICategory } from "../../model/Category";

export class GetAllCategoriesUseCase {
    private repository: IRepositoryCategory;

    constructor(reposioty: IRepositoryCategory) {
        this.repository = reposioty;
    }

    execute(): Promise<ICategory[]> {
        return this.repository.getAllCategories();
    }

}