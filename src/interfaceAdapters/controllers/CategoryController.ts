import { IncomingMessage, ServerResponse } from "http";
import { RepositoryCategoryImpl } from "../adapters/RepositoryCategoryImpl";
import { CreateCategoryUseCase } from "../../domain/useCases/categories/CreateCategoryUseCase";
import { ICategory } from "../../domain/model/Category";
import { parseRequestBody } from "../../driversAndFrameworks/http/parseRequestBody";
import { GetAllCategoriesUseCase } from "../../domain/useCases/categories/GetAllCategoriesUseCase";
import { GetCategoryByIdUseCase } from "../../domain/useCases/categories/GetCategoryByIdUseCase";
import { parse } from "url";

export class CategoryController {
    private createCategoryUseCase: CreateCategoryUseCase;
    private getAllCategoriesUseCase : GetAllCategoriesUseCase;
    private getCategoryByIdUseCase: GetCategoryByIdUseCase;

    constructor() {
        this.createCategoryUseCase = new CreateCategoryUseCase(new RepositoryCategoryImpl());
        this.getAllCategoriesUseCase = new GetAllCategoriesUseCase(new RepositoryCategoryImpl());
        this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(new RepositoryCategoryImpl());
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
}