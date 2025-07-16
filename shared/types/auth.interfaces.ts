export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TokenObject {
  access_token: string;
  expiration_date: Date;
  token_type: string;
}

export interface NitroResponse<T> {
  statusCode: number;
  statusMessage: string;
  payload: T | null;
  message: string;
}

export interface LoginPayload {
  uid: string;
  email: string;
  username: string;
}

export interface DisplayNamePayload {
  displayName: string;
}
