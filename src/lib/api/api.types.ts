export interface ApiSuccessEnvelope<T> {
  error: false;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  error: true;
  statusCode: number;
  errorType: string;
  message: string;
  data: null;
}
