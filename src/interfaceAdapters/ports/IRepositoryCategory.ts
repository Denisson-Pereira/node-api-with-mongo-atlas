import { ICategory } from "../../domain/model/Category";

export interface IRepositoryCategory {
    getAllCategories(): Promise<ICategory[]>
    save(Category: ICategory): Promise<ICategory>
    getCategoryById(id: string): Promise<ICategory | null>
    deleteById(id: string): Promise<string>
    update(id: string, Category: ICategory): Promise<ICategory | null>
}