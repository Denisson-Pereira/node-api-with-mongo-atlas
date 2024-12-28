import { ICategory } from "../domain/model/Category";
import { IRepositoryCategory } from "../ports/IRepositoryCategory";

export class RepositoryCategoryImpl implements IRepositoryCategory {
    getAllCategories(): Promise<ICategory[]> {
        throw new Error("Method not implemented.");
    }
    save(Category: ICategory): Promise<ICategory> {
        throw new Error("Method not implemented.");
    }
    getCategoryById(id: string): Promise<ICategory | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    update(id: string, Category: ICategory): Promise<ICategory | null> {
        throw new Error("Method not implemented.");
    }


    
}