import { NextApiRequest, NextApiResponse } from 'next';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export function route(routing: Partial<Record<HttpMethod, (req: NextApiRequest, res: NextApiResponse) => Promise<any>>>) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const method = req.method as unknown as HttpMethod;
        if (!method) {
            throw new Error('The request must contain a valid HTTP method');
        }

        if (!routing[method]) {
            throw new Error(`There is no handler defined for method ${method}`);
        }

        routing[method]!(req, res);
    };
}
