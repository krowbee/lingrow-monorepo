import type { User } from "@/types/auth/user";

import { ADMIN_URL } from "./urls/admin";
import { AUTH_URLS } from "./urls/auth";
import { COURSES_URL } from "./urls/courses";

export const matchPrefix = (path: string, prefixes: string[]): boolean => {
  return prefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
};

type Rule = {
  match: string[];
  guestOnly?: boolean;
  authOnly?: boolean;
  redirectTo: string;
  role?: User["role"][];
};

export const rules = [
  {
    match: [AUTH_URLS.login, AUTH_URLS.signup],
    guestOnly: true,
    redirectTo: COURSES_URL.courses_page,
  },
  {
    match: [ADMIN_URL.adminPage],
    authOnly: true,
    redirectTo: AUTH_URLS.login,
    role: ["admin"],
  },
  {
    match: [AUTH_URLS.logout, COURSES_URL.courses_page],
    authOnly: true,
    redirectTo: AUTH_URLS.login,
    role: ["user", "admin"],
  },
] satisfies Rule[];
