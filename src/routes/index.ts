import { IncomingMessage, ServerResponse } from "http";
import { ProductController } from "../controllers/ProductController";

const productController = new ProductController();

export const productRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    if (req.method === 'GET' && req.url === "/products") {
        productController.getAllProducts(req, res);
    } else if (req.method === 'POST' && req.url === "/products") {
        productController.createProduct(req, res);
    } else if (req.method === 'GET' && req.url?.startsWith("/products/")) {
        const id = req.url.split("/")[2]; 
        
        if (id) {
            req.url = id;
            productController.getByIdProductsUseCase(req, res);
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "ID inválido ou ausente" }));
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
};
