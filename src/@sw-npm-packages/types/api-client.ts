/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios'

import { IKeyValuePair } from './generic'

export type THeader = IKeyValuePair<string | number | boolean>
export type TAxiosInstances = IKeyValuePair<AxiosInstance>
export type TStandardPayload = IKeyValuePair<any>
export type TStandardQueries = IKeyValuePair<any>
export interface IRequestInterceptor {
  getAccessToken?: () => Promise<string>
  getHeaders?: () => THeader
}

export interface IResponseErrorHandlers {
  Unauthorized?: () => Promise<void>
  BadGateway?: () => Promise<void>
  ServerUnavailable?: () => Promise<void>
  ServerError?: () => Promise<void>
  NetworkError?: () => Promise<void>
}

export interface IResponseHandlers {
  responseErrorHandlers?: IResponseErrorHandlers
}

export interface IInterceptor extends IRequestInterceptor, IResponseHandlers {}

export interface IAxiosInstanceCreator extends IInterceptor {
  environment: string
  attachInterceptors?: boolean
  attachResponseInterceptors?: boolean
  version?: string
}

export interface IInterceptorCreator {
  requestSuccessInterceptor: (
    config: InternalAxiosRequestConfig
  ) => Promise<InternalAxiosRequestConfig>
  requestErrorInterceptor: (error: AxiosError) => Promise<AxiosError>
  responseSuccessInterceptor: (response: AxiosResponse) => AxiosResponse
  responseErrorInterceptor: (error: AxiosError) => Promise<AxiosError>
  publicApiRequestSuccessInterceptor: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
}
