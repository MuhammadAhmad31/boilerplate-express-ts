import { ErrorResponse, SuccessResponse } from "../types/responseApi";

export const handleSuccessResponse = <T>(
  res: any,
  message: string,
  data: T,
  statusCode: number = 200
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    code: statusCode,
    message,
    data: data ?? undefined,
  };
  res.status(statusCode).json(response);
};

export const handleErrorResponse = (
  res: any,
  message: string,
  statusCode: number = 400
): void => {
  const response: ErrorResponse = {
    success: false,
    code: statusCode,
    message,
  };
  res.status(statusCode).json(response);
};

export const handleUnauthorizedResponse = (
  res: any,
  message: string,
  statusCode: number = 401
): void => {
  const response: ErrorResponse = {
    success: false,
    code: statusCode,
    message,
  };
  res.status(statusCode).json(response);
};

export const handleForbiddenResponse = (
  res: any,
  message: string,
  statusCode: number = 403
): void => {
  const response: ErrorResponse = {
    success: false,
    code: statusCode,
    message,
  };
  res.status(statusCode).json(response);
};
