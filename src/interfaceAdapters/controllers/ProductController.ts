import { IncomingMessage, ServerResponse } from "http";
import { RepositoryProductImpl } from "../adapters/RepositoryProductImpl";
import { IProduct } from "../../domain/model/Product";
import { GetAllProductsUseCase } from "../../domain/useCases/products/GetAllProductsUseCase";
import { CreateProductsUseCase } from "../../domain/useCases/products/CreateProductsUseCase";
import { parseRequestBody } from "../../driversAndFrameworks/http/parseRequestBody";
import { parse } from "url";
import { GetProductByIdUseCase } from "../../domain/useCases/products/GetProductByIdUseCase";
import { DeleteProductByIdUseCase } from "../../domain/useCases/products/DeleteProductByIdUseCase";
import { PutProductUseCase } from "../../domain/useCases/products/PutProductUseCase";
import { InvalidPriceError } from "../../domain/exceptions/InvalidPriceError";
import { InvalidIdError } from "../../domain/exceptions/InvalidIdError";

export class ProductController {
    private getAllProductUseCase: GetAllProductsUseCase;
    private createProductUseCase: CreateProductsUseCase;
    private getProductByIdUseCase: GetProductByIdUseCase;
    private deleteProductByIdUseCase: DeleteProductByIdUseCase;
    private putProductUseCase: PutProductUseCase;

    constructor() {
        this.getAllProductUseCase = new GetAllProductsUseCase(new RepositoryProductImpl());
        this.createProductUseCase = new CreateProductsUseCase(new RepositoryProductImpl());
        this.getProductByIdUseCase = new GetProductByIdUseCase(new RepositoryProductImpl());
        this.deleteProductByIdUseCase = new DeleteProductByIdUseCase(new RepositoryProductImpl());
        this.putProductUseCase = new PutProductUseCase(new RepositoryProductImpl());
    }

    public async createProduct(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const productoReq: IProduct = await parseRequestBody(req);
    
            const response = await this.createProductUseCase.execute(productoReq);
    
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            
            res.end(JSON.stringify(response)); 

        } catch (error) {
            if (error instanceof InvalidPriceError) {
                res.statusCode = error.statusCode;  
                res.end(JSON.stringify({ message: error.message })); 
            } else {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: "Erro ao criar produto", error }));
            }
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

    public async getByIdProductsUseCase(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            const product: IProduct | null = await this.getProductByIdUseCase.execute(id);

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(product));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao buscar produto", error }))
        }
    }

    public async deleteByIdProductUseCase(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            await this.deleteProductByIdUseCase.execute(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({  message: "Produto deletado com sucesso!" }));

        } catch (error) {
            if (error instanceof InvalidIdError) {
                res.statusCode = error.statusCode;  
                res.end(JSON.stringify({ message: error.message })); 
            } else {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: "Erro deletar produto", error }));
            }
        }
    }

    public async putProductByIdUseCase(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            const productoReq: IProduct = await parseRequestBody(req);

            if (!id || !productoReq) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            const newProduct = await this.putProductUseCase.execute(id, productoReq);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(newProduct));

        } catch (error) {
            if (error instanceof InvalidPriceError) {
                res.statusCode = error.statusCode;  
                res.end(JSON.stringify({ message: error.message })); 
            } else {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: "Erro ao editar produto", error }));
            }
        }
    }
}