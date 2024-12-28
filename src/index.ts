import http, { IncomingMessage, ServerResponse } from 'node:http'
import { productRoutes } from './routes';
import { main } from './drivers/conn';

const PORT = 8000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    productRoutes(req, res);
});

main();

server.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});