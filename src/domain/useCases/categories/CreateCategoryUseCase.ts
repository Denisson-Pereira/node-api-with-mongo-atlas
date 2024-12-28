import { IRepositoryCategory } from "../../../ports/IRepositoryCategory";
import { ICategory } from "../../model/Category";


export class CreateCategoryUseCase {
    private repository: IRepositoryCategory;

    constructor(repository: IRepositoryCategory) {
        this.repository = repository;
    }

    async execute(product: ICategory): Promise<ICategory> {
        return this.repository.save(product);
    }
}