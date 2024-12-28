import { IncomingMessage, ServerResponse } from "http";
import { ProductController } from "../controllers/ProductController";

const productController = new ProductController();

export const productRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;

    const id = url?.startsWith("/products/") ? url.split("/")[2] : null;

    switch (true) {
        case method === "GET" && url === "/products":
            productController.getAllProducts(req, res);
            break;

        case method === "POST" && url === "/products":
            productController.createProduct(req, res);
            break;

        case method === "GET" && url?.startsWith("/products/"):
            if (id) {
                productController.getByIdProductsUseCase(req, res);
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou ausente" }));
            }
            break;

        case method === "DELETE" && url?.startsWith("/products/"):
            if (id) {
                productController.deleteByIdProductUseCase(req, res);
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou ausente" }));
            }
            break;

        case method === "PUT" && url?.startsWith("/products/"):
            if (id) {
                productController.putProductByIdUseCase(req, res);
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "ID inválido ou ausente" }));
            }
            break;

        default:
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Rota não encontrada" }));
            break;
    }
};
