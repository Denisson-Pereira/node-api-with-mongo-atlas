import { IncomingMessage, ServerResponse } from "http";
import { RepositoryProductImpl } from "../adapters/RepositoryProductImpl";
import { IProduct } from "../model/Product";
import { GetAllProductsUseCase } from "../useCases/GetAllProductsUseCase";
import { CreateProductsUseCase } from "../useCases/CreateProductsUseCase";
import { parseRequestBody } from "../shared/parseRequestBody";

export class ProductController {
    private getAllProductUseCase: GetAllProductsUseCase;
    private createProductUseCase: CreateProductsUseCase;

    constructor() {
        this.getAllProductUseCase = new GetAllProductsUseCase(new RepositoryProductImpl());
        this.createProductUseCase = new CreateProductsUseCase(new RepositoryProductImpl());

    }

    public async createProduct(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const productoReq: IProduct = await parseRequestBody(req);
    
            const response = await this.createProductUseCase.execute(productoReq);
    
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            
            res.end(JSON.stringify(response)); 

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao criar produto", error }));
        }
    }

    public async getAllProducts(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const products: IProduct[] = await this.getAllProductUseCase.execute();

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(products));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao buscar produtos", error }))
        }
    }
}