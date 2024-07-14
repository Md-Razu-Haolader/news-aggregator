import { AnyObject } from '.';

export interface HttpClient<H, R> {
  get: (uri: string, headers?: H) => Promise<R>;
  post: (uri: string, body: AnyObject, headers?: H) => Promise<R>;
  put: (uri: string, body: AnyObject, headers?: H) => Promise<R>;
  patch: (uri: string, body: AnyObject, headers?: H) => Promise<R>;
  delete: (uri: string, body: AnyObject, headers?: H) => Promise<R>;
}
