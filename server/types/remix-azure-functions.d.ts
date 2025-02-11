/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@scandinavianairlines/remix-azure-functions' {
  import type { AppLoadContext } from '@remix-run/server-runtime';

  export interface RequestHandlerOptions {
    build: any;
    mode?: string;
    getLoadContext?: (request: Request) => AppLoadContext;
  }

  export function createRequestHandler(options: RequestHandlerOptions): (context: any, req: any) => Promise<any>;
}