export type ApiErrorCategory =
  | "cancelled"
  | "forbidden"
  | "network"
  | "not-found"
  | "server"
  | "session-expired"
  | "state-conflict"
  | "unexpected"
  | "validation";

interface ApiErrorOptions {
  category: ApiErrorCategory;
  message: string;
  status?: number;
  errorType?: string;
  isNetworkError?: boolean;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly category: ApiErrorCategory;
  readonly status?: number;
  readonly errorType?: string;
  readonly isNetworkError: boolean;
  override readonly cause?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.category = options.category;
    this.isNetworkError = options.isNetworkError ?? false;

    if (options.status !== undefined) {
      this.status = options.status;
    }

    if (options.errorType !== undefined) {
      this.errorType = options.errorType;
    }

    if (options.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}
