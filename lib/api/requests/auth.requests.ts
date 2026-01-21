import {
  LoginFormData,
  RegisterFormData,
} from "@/components/schemas/authSchemas";
import { fetchWithoutRefresh } from "../fetchWithoutRefresh";
import { API_URL } from "../constants";
import { ApiResult } from "@/types/api/api-result.type";
import { User } from "@/types/auth/user";

export async function login(formData: LoginFormData): Promise<ApiResult<User>> {
  const res = await fetchWithoutRefresh(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json();
    return { ok: false, error: error.message };
  }
  return { ok: true, data: await res.json() };
}

export async function register(
  formData: RegisterFormData
): Promise<ApiResult<User>> {
  const res = await fetchWithoutRefresh(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json();
    return { ok: false, error: error.message };
  }
  return { ok: true, data: await res.json() };
}

export async function logout() {
  return await fetchWithoutRefresh(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
