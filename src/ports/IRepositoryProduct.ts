import { IProduct } from "../model/Product";

export interface IRepositoryProduct {
    getAllProducts(): Promise<IProduct[]>
    save(product: IProduct): Promise<IProduct>
    getProductById(id: string): Promise<IProduct | null>
}