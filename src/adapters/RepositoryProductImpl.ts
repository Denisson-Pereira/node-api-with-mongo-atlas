import { ProductModel } from "../database/ProductSchema";
import { IProduct } from "../model/Product";
import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class RepositoryProductImpl implements IRepositoryProduct {
    async save(product: IProduct): Promise<IProduct> {
        await ProductModel.create(product);
        return product;
    }
    async getAllProducts(): Promise<IProduct[]> {
        const response = await ProductModel.find();
        return response;
    }
    
}