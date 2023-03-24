import { NextApiRequest, NextApiResponse } from 'next';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export function route(
    req: NextApiRequest,
    res: NextApiResponse,
    routing: Partial<Record<HttpMethod, (req: NextApiRequest, res: NextApiResponse) => Promise<any>>>
) {
    const method = req.method as unknown as HttpMethod;
    if (!method) {
        throw new Error('The request must contain a valid HTTP method');
    }

    if (!routing[method]) {
        throw new Error(`There is no handler defined for method ${method}`);
    }

    routing[method]!(req, res);
}
