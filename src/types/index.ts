export interface User {
  email: string;
  name?: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface InstructionsRequest {
  question: string;
}

export interface InstructionsResponse {
  message: string;
  response: string[];
}

export interface SearchHistoryResult {
  id: string | number;
  question: string;
}

export interface SearchHistoryItem {
  question: string;
  results: SearchHistoryResult[];
}

export interface SearchHistoryResponse {
  history: SearchHistoryItem[];
}

export interface ApiError {
  detail: string;
}
