"use client";

import { getMe } from "@/lib/api/requests/auth.requests";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export function useAuthInit() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    const init = async () => {
      const result = await getMe();

      if (result.ok) {
        const user = result.data;
        login(user);
        setIsLoading(false);
      } else {
        logout();
        setIsLoading(false);
      }
    };
    init();
  }, [login, setIsLoading, logout]);
}
