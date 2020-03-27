export type StatusCode = number;

export interface DefaultErrorResponseInterface {
  statusCode: StatusCode;
  timestamp: string;
  name: string;
  message: string;
}
