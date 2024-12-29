import { ICategory } from "../../domain/model/Category";
import { CategoryModel } from "../../driversAndFrameworks/db/schemas/CategorySchema";
import { ProductModel } from "../../driversAndFrameworks/db/schemas/ProductSchema";
import { IRepositoryCategory } from "../ports/IRepositoryCategory";

export class RepositoryCategoryImpl implements IRepositoryCategory {
    async getAllCategories(): Promise<ICategory[]> {
        const response = await CategoryModel.find();
        return response;
    }
    async save(category: ICategory): Promise<ICategory> {
        await CategoryModel.create(category);
        return category;
    }
    async getCategoryById(id: string): Promise<ICategory | null> {
        const response = await CategoryModel.findById(id);
        return response;
    }
    async deleteById(id: string): Promise<string> {
        await CategoryModel.findByIdAndDelete(id);
        return "Deletado com sucesso!";

    }
    async update(id: string, category: ICategory): Promise<ICategory | null> {
        const searchCategory = await CategoryModel.findById(id);

        if(searchCategory) {
            searchCategory.set(category);
            await searchCategory.save();

            return searchCategory;
        } else {
            return null;
        }
    }


    
}