const AUTH_API_PATH = "auth";

export const authApiPaths = {
  forgotPassword: `${AUTH_API_PATH}/forgot-password`,
  google: `${AUTH_API_PATH}/google`,
  login: `${AUTH_API_PATH}/login`,
  logout: `${AUTH_API_PATH}/logout`,
  refresh: `${AUTH_API_PATH}/refresh`,
  register: `${AUTH_API_PATH}/register`,
  resetPassword: `${AUTH_API_PATH}/reset-password`,
} as const;
