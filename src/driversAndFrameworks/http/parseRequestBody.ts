import { IncomingMessage } from "http";

export function parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse(body)); 
            } catch (error) {
                reject(error); 
            }
        });

        req.on('error', (err) => {
            reject(err); 
        });
    });
}