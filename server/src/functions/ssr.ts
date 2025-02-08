import { app } from '@azure/functions';
import { createRequestHandler } from '@scandinavianairlines/remix-azure-functions';

import path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.resolve(__dirname, '../../../../build/server/index.js');

const buildUrl = pathToFileURL(buildPath).href;
const build = await import(buildUrl);

app.setup({ enableHttpStream: true });

app.http('ssr', {
    methods: [
        'GET',
        'POST',
        'DELETE',
        'HEAD',
        'PATCH',
        'PUT',
        'OPTIONS',
        'TRACE',
        'CONNECT'
    ],
    authLevel: 'anonymous',
    handler: createRequestHandler({
        build,
    }),
    route: 'ssr/{*path}',
});