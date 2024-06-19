interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TokenObject {
  access_token: string;
  expiration_date: Date;
  token_type: string;
}
