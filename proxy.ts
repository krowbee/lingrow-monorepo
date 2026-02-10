import { NextRequest, NextResponse } from "next/server";
import { AUTH_URLS } from "./urls/auth";
import { COURSES_URL } from "./urls/courses";

type Rule = {
  match: string[];
  guestOnly?: boolean;
  authOnly?: boolean;
  redirectTo: string;
};

const rules: Rule[] = [
  {
    match: [AUTH_URLS.login, AUTH_URLS.signup],
    guestOnly: true,
    redirectTo: COURSES_URL.courses_page,
  },
  {
    match: [AUTH_URLS.logout, COURSES_URL.courses_page],
    authOnly: true,
    redirectTo: AUTH_URLS.login,
  },
];

const matchPrefix = (path: string, prefixes: string[]) => {
  return prefixes.some((p) => path === p || path.startsWith(p + "/"));
};

export async function proxy(req: NextRequest) {
  const isAuth = req.cookies.has("refreshToken");

  const page = req.nextUrl.pathname;
  const rule = rules.find((rule) => matchPrefix(page, rule.match));
  if (!rule) return NextResponse.next();
  if (rule.authOnly && !isAuth) {
    return NextResponse.redirect(new URL(rule.redirectTo, req.url));
  }
  if (rule.guestOnly && isAuth) {
    console.log("guestOnly activated");
    return NextResponse.redirect(new URL(rule.redirectTo, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
