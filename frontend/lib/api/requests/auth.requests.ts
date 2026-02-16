import {
  LoginFormData,
  RegisterFormData,
} from "@/components/schemas/authSchemas";
import { fetchWithoutRefresh } from "../fetchWithoutRefresh";
import { API_URL } from "../constants";
import { ApiResult } from "@/types/api/api-result.type";
import { User } from "@/types/auth/user";
import { fetchToApi } from "../fetchWithRefresh";

export async function loginOnServer(
  formData: LoginFormData,
): Promise<ApiResult<User>> {
  const res = await fetchWithoutRefresh(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.user };
}

export async function registerOnServer(
  formData: RegisterFormData,
): Promise<ApiResult<User>> {
  const res = await fetchWithoutRefresh(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.user };
}

export async function getMe() {
  const res = await fetchToApi(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.user };
}

export async function logoutOnServer() {
  return await fetchWithoutRefresh(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
