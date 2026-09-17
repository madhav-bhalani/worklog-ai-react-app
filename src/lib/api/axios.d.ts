import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    worklog?: {
      isPayloadWrapped?: boolean;
      skipAuthRefresh?: boolean;
    };
  }

  interface InternalAxiosRequestConfig {
    worklog?: {
      isPayloadWrapped?: boolean;
      skipAuthRefresh?: boolean;
    };
  }
}
