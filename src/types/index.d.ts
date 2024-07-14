import * as core from 'express-serve-static-core';

export type AnyObject = {
  [k: string]: any;
};

export interface AnyMethod {
  [functionName: string]: (...params: any) => any;
}

// Paginated express query
export interface PaginationQuery extends core.Query {
  page?: number;
  limit?: number;
}

// Paginated result
export interface PaginatedResult {
  data: Array<T>;
  meta: {
    totalPage: number;
    current: number;
    totalItem: number;
    perPage: number;
  };
}
// Api response type
export interface ApiResponse {
  // Response message
  message: string;
  // Requested data
  data?: any;
  // Validation error messages
  errors?: any;
  // Additional meta data
  meta?: AnyObject;
}
