import { ProductModel } from "../database/ProductSchema";
import { IProduct } from "../model/Product";
import { IRepositoryProduct } from "../ports/IRepositoryProduct";

export class RepositoryProductImpl implements IRepositoryProduct {

    async update(id: string, product: IProduct): Promise<IProduct | null> {
        const searchProduct = await ProductModel.findById(id);
        if(searchProduct) {
            searchProduct.set(product);
            await searchProduct.save();

            return searchProduct;
        } else {
            return null;
        }
    }
    async deleteById(id: string): Promise<string> {
        await ProductModel.findByIdAndDelete(id);
        return "Deletado com sucesso!";
    }
    async getProductById(id: string): Promise<IProduct | null> {
        const response = await ProductModel.findById(id);
        return response;
    }
    async save(product: IProduct): Promise<IProduct> {
        await ProductModel.create(product);
        return product;
    }
    async getAllProducts(): Promise<IProduct[]> {
        const response = await ProductModel.find();
        return response;
    }
    
}