import { useAuthStore } from "@/store/AuthStore";
import { matchPrefix } from "@/urlRules";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { rules } from "../urlRules";
import { AUTH_URLS } from "@/urls/auth";
import { COURSES_URL } from "@/urls/courses";

export function useAuthGuard() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (isLoading) return;
    const rule = rules.find((rule) => matchPrefix(pathname, rule.match));

    if (!rule) return;

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
  }, [user, pathname, router, isAuth, isLoading]);
}
