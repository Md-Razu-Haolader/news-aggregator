import { AnyObject } from '@/types';
import { Service } from 'typedi';
import { HttpClient } from '@/types/http';
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

@Service()
export default class AxiosClient implements HttpClient<AxiosRequestHeaders, AxiosResponse> {
  public defaultHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  prepareHeaders = (headers: AxiosRequestHeaders) => {
    return {
      ...this.defaultHeaders,
      ...headers,
    };
  };

  async get<T = AnyObject>(uri: string, headers: AxiosRequestHeaders = this.defaultHeaders): Promise<AxiosResponse<T>> {
    const response = await axios(uri, {
      method: 'GET',
      headers: this.prepareHeaders(headers),
    });

    return response;
  }

  async post<T = AnyObject>(
    uri: string,
    body: AnyObject,
    headers: AxiosRequestHeaders = this.defaultHeaders
  ): Promise<AxiosResponse<T>> {
    const response = await axios(uri, {
      method: 'POST',
      data: body,
      headers: this.prepareHeaders(headers),
    });

    return response;
  }

  async put<T = AnyObject>(
    uri: string,
    body: AnyObject,
    headers: AxiosRequestHeaders = this.defaultHeaders
  ): Promise<AxiosResponse<T>> {
    const response = await axios(uri, {
      method: 'PUT',
      data: body,
      headers: this.prepareHeaders(headers),
    });
    return await response.data;
  }

  async patch<T = AnyObject>(
    uri: string,
    body: AnyObject,
    headers: AxiosRequestHeaders = this.defaultHeaders
  ): Promise<AxiosResponse<T>> {
    const response = await axios(uri, {
      method: 'PATCH',
      data: body,
      headers: this.prepareHeaders(headers),
    });
    return await response.data;
  }

  async delete<T = AnyObject>(
    uri: string,
    body: AnyObject,
    headers: AxiosRequestHeaders = this.defaultHeaders
  ): Promise<AxiosResponse<T>> {
    const response = await axios(uri, {
      method: 'DELETE',
      data: body,
      headers: this.prepareHeaders(headers),
    });
    return await response.data;
  }
}
