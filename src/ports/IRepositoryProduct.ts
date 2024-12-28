import { IProduct } from "../model/Product";

export interface IRepositoryProduct {
    getAllProducts(): Promise<IProduct[]>
    save(product: IProduct): Promise<IProduct>
    getProductById(id: string): Promise<IProduct | null>
    deleteById(id: string): Promise<string>
    update(id: string, product: IProduct): Promise<IProduct | null>
}