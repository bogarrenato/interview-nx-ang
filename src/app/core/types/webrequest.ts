//types
export type WebRequest<T = unknown> =
  | NotCalledRequest
  | LoadingRequest
  | ErrorRequest
  | ResultRequest<T>;

export interface LoadingRequest {
  isLoading: true;
}

export interface ErrorRequest {
  hasError: true;
}

export interface ResultRequest<T> {
  data: T;
  isPagingLoading?: boolean;
}

export interface NotCalledRequest {
  isNotCalled: true;
}

//Constants
export const NOT_CALLED_REQUEST: NotCalledRequest = { isNotCalled: true };
export const LOADING_REQUEST: LoadingRequest = { isLoading: true };
export const ERROR_REQUEST: ErrorRequest = { hasError: true };
export const RESULT_REQUEST = <T>(
  data: T,
  isPagingLoading?: boolean
): ResultRequest<T> => ({
  data,
  isPagingLoading,
});
export const VOID_RESULT_REQUEST = RESULT_REQUEST<void>(undefined, false);
