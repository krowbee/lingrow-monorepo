import { matchPrefix } from "@/urlRules";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { rules } from "../urlRules";
import { AUTH_URLS } from "@/urls/auth";
import { COURSES_URL } from "@/urls/courses";
import { useMe } from "./useMe";
import { UseQueryResult } from "@tanstack/react-query";
import { User } from "@/types/auth/user";

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading }: UseQueryResult<User | null> = useMe();
  useEffect(() => {
    if (isLoading) return;
    const rule = rules.find((rule) => matchPrefix(pathname, rule.match));

    if (!rule) return;

    const isAuth = Boolean(user);

    if (isAuth && rule.guestOnly) {
      router.replace(COURSES_URL.courses_page);
      return;
    }
    if (!isAuth && rule.authOnly) {
      router.replace(AUTH_URLS.login);
      return;
    }
    if (isAuth && user && !rule.role?.includes(user.role)) {
      router.replace("/");
      return;
    }
  }, [pathname, router, isLoading, user]);

  return { user, isLoading, isAuth: Boolean(user) };
}
