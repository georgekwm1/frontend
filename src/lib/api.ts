import axios, { AxiosError, AxiosInstance } from "axios";
import type {
  AuthTokens,
  ForgotPasswordPayload,
  InstructionsRequest,
  InstructionsResponse,
  LoginPayload,
  ResetPasswordPayload,
  SearchHistoryResponse,
  SignupPayload,
} from "@/types";

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8000";

export const TOKEN_KEY = "icai_token";

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (r) => r,
  (error: AxiosError<{ detail?: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export function extractError(err: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(err)) {
    const detail = (err.response?.data as { detail?: string } | undefined)
      ?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      const first = detail[0] as { msg?: string } | undefined;
      if (first?.msg) return first.msg;
    }
    return err.message || fallback;
  }
  return fallback;
}

export const authApi = {
  signup: (payload: SignupPayload) =>
    client.post<{ message: string }>("/signup", payload).then((r) => r.data),
  login: (payload: LoginPayload) =>
    client.post<AuthTokens>("/login", payload).then((r) => r.data),
  forgotPassword: (payload: ForgotPasswordPayload) =>
    client
      .post<{ message: string }>("/forgot-password", payload)
      .then((r) => r.data),
  resetPassword: (payload: ResetPasswordPayload) =>
    client
      .post<{ message: string }>("/reset-password", payload)
      .then((r) => r.data),
};

export const aiApi = {
  ask: (payload: InstructionsRequest) =>
    client
      .post<InstructionsResponse>("/instructions", payload)
      .then((r) => r.data),
  history: () =>
    client.get<SearchHistoryResponse>("/search_history").then((r) => r.data),
};

export default client;
