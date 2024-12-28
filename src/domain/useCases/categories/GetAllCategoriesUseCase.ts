import { IRepositoryCategory } from "../../../ports/IRepositoryCategory";
import { ICategory } from "../../model/Category";

export class GetAllCategoriesUseCase {
    private repository: IRepositoryCategory;

    constructor(reposioty: IRepositoryCategory) {
        this.repository = reposioty;
    }

    async execute(): Promise<ICategory[]> {
        return this.repository.getAllCategories();
    }

}