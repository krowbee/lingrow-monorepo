import { NextRequest, NextResponse } from "next/server";
import { matchPrefix, rules } from "./urlRules";

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
