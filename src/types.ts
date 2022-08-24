
import {HTTP_GET_METHOD, HTTP_POST_METHOD, HTTP_STATUS_OK ,HTTP_STATUS_INTERNAL_SERVER_ERROR} from './constants';

export enum httpMethods {
  HTTP_GET_METHOD,
  HTTP_POST_METHOD,
}

export enum httpStatuses {
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
}

export type responce = {
  status: httpStatuses,
}

export type mock = {
  name: string,
  age: number,
  roles: string[],
  createdAt: Date,
  isDeleated: boolean,
};

export type request = {
  method: httpMethods,
  host: string,
  path: string,
  body?: mock,
  params: {
    id?: string,
  },
};

export type handler = (value: request) => responce;

export type handlers = {
  next: handler,
  error: handler,
  complete: () => void,
};

export interface ObserverInterface {
  handlers: handlers,

  _unsubscribe: () => void,

  next: (value: request) => void,

  error: (error: request) => void,

  complete: () => void,

  unsubscribe: () => void,
}

type unsubscribeHandler = {
  unsubscribe: () => void
};

export interface ObserverbleInterface {
  subscribe: (value: handlers) => unsubscribeHandler,
};

export type subscriber = (observer: ObserverInterface) => void;