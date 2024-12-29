import { IncomingMessage, ServerResponse } from "http";
import { RepositoryCategoryImpl } from "../adapters/RepositoryCategoryImpl";
import { CreateCategoryUseCase } from "../../domain/useCases/categories/CreateCategoryUseCase";
import { ICategory } from "../../domain/model/Category";
import { parseRequestBody } from "../../driversAndFrameworks/http/parseRequestBody";
import { GetAllCategoriesUseCase } from "../../domain/useCases/categories/GetAllCategoriesUseCase";

export class CategoryController {
    private createCategoryUseCase: CreateCategoryUseCase;
    private getAllCategoriesUseCase : GetAllCategoriesUseCase;

    constructor() {
        this.createCategoryUseCase = new CreateCategoryUseCase(new RepositoryCategoryImpl());
        this.getAllCategoriesUseCase = new GetAllCategoriesUseCase(new RepositoryCategoryImpl());
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

}