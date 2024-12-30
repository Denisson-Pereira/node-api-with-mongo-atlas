import { IncomingMessage, ServerResponse } from "http";
import { RepositoryCategoryImpl } from "../adapters/RepositoryCategoryImpl";
import { CreateCategoryUseCase } from "../../domain/useCases/categories/CreateCategoryUseCase";
import { ICategory } from "../../domain/model/Category";
import { parseRequestBody } from "../../driversAndFrameworks/http/parseRequestBody";
import { GetAllCategoriesUseCase } from "../../domain/useCases/categories/GetAllCategoriesUseCase";
import { GetCategoryByIdUseCase } from "../../domain/useCases/categories/GetCategoryByIdUseCase";
import { parse } from "url";
import { DeleteCategoryByIdUseCase } from "../../domain/useCases/categories/DeleteCategoryByIdUseCase";
import { PutCategoryUseCase } from "../../domain/useCases/categories/PutCategoryUseCase";
import { InvalidIdError } from "../../domain/exceptions/InvalidIdError";

export class CategoryController {
    private createCategoryUseCase: CreateCategoryUseCase;
    private getAllCategoriesUseCase : GetAllCategoriesUseCase;
    private getCategoryByIdUseCase: GetCategoryByIdUseCase;
    private deleteCategoryUseCase: DeleteCategoryByIdUseCase;
    private putCategoryUseCase: PutCategoryUseCase;

    constructor() {
        this.createCategoryUseCase = new CreateCategoryUseCase(new RepositoryCategoryImpl());
        this.getAllCategoriesUseCase = new GetAllCategoriesUseCase(new RepositoryCategoryImpl());
        this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(new RepositoryCategoryImpl());
        this.deleteCategoryUseCase = new DeleteCategoryByIdUseCase(new RepositoryCategoryImpl());
        this.putCategoryUseCase = new PutCategoryUseCase(new RepositoryCategoryImpl());
    }

    public async createCategory(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const categoryReq: ICategory = await parseRequestBody(req);

            const response = await this.createCategoryUseCase.execute(categoryReq);

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(response));
            
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao criar categoria", error }))
        }
    }

    public async getAllCategory(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const response = await this.getAllCategoriesUseCase.execute();

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(response));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao buscar categorias" }));
        }
    }

    public async getCategoryById(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            const category: ICategory | null = await this.getCategoryByIdUseCase.execute(id);

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(category));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao buscar categoria" }));
        }
    }

    public async DeleteCategoryByIdUseCase(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            await this.deleteCategoryUseCase.execute(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({  message: "Categoria deletado com sucesso!" }));      

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

    public async putCategoryById(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = parse(req.url || "", true);
            const id = parsedUrl.pathname?.split("/").pop();

            const categoryReq: ICategory = await parseRequestBody(req);

            if (!id || !categoryReq) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou não fornecido!" }));
                return;
            }

            const newProduct = await this.putCategoryUseCase.execute(id, categoryReq);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(newProduct));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Erro ao editar produto", error }));
        }
    }
}