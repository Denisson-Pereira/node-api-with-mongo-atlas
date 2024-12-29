import { IncomingMessage, ServerResponse } from "http";
import { CategoryController } from "../../interfaceAdapters/controllers/CategoryController";

const categoryController = new CategoryController();

export const categoryRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;

    const id = url?.startsWith("/categories/") ? url.split("/")[2]: null;

    switch(true) {
        case method === "POST" && url === "/categories":
            categoryController.createCategory(req, res);
            break;

        case method === "GET" && url === "/categories":
        categoryController.getAllCategory(req, res);
            break;

        case method === "GET" && url?.startsWith("/categories/"):
            if (id) {
                categoryController.getCategoryById(req, res);
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou ausente" }));
            }
            break;

        default:
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Rota não encontrada!" }));
            break;
    }
}