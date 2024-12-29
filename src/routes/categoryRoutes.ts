import { IncomingMessage, ServerResponse } from "http";
import { CategoryController } from "../controllers/CategoryController";

const categoryController = new CategoryController();

export const categoryRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;

    const id = url?.startsWith("cateogry") ? url.split("/")[2]: null;

    switch(true) {
        case method === "POST" && url === "/categories":
        categoryController.createCategory(req, res);
        break;

        case method === "GET" && url === "/categories":
        categoryController.getAllCategory(req, res);
        break;

        default:
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Rota não encontrada!" }));
    }
}