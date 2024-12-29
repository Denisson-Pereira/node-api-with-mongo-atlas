import http, { IncomingMessage, ServerResponse } from 'node:http'
import { productRoutes } from './routes/productRoutes';
import { main } from './drivers/conn';
import { categoryRoutes } from './routes/categoryRoutes';
import path from 'node:path';
import fs from 'node:fs'

const PORT = 8000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    switch (true) {
        case req.url === "/":
            const filePath = path.join(__dirname, "presentation", "views", "index.html");

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log("Erro ao ler arquivo:", err.message);
                    res.statusCode = 500;
                    res.end('Server error!')
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            })
            break;


        case req.url?.startsWith("/css/"):
            const filePathCss = path.join(__dirname, "presentation", "css", "styles.css");
            fs.readFile(filePathCss, (err, data) => {
                if (err) {
                    console.log("Erro ao ler arquivo css:", err.message);
                    res.statusCode = 404;
                    res.end('Arquivo CSS não encontrado');
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/css');
                res.end(data);
            })
            break;

        case req.url?.startsWith("/products"):
            productRoutes(req, res);
            break;

        case req.url?.startsWith("/categories"):
            categoryRoutes(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Not found!" }));
    }
});

main();

server.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});