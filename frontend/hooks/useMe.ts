"use client";

import { getMe } from "@/lib/api/requests/auth.requests";
import type { User } from "@/types/auth/user";
import { useQuery } from "@tanstack/react-query";

export const authQueryKeys = {
  me: ["auth", "me"],
} as const;

export function useMe() {
  return useQuery<User | null>({
    queryKey: authQueryKeys.me,
    queryFn: async (): Promise<User | null> => {
      const result = await getMe();
      if (!result.ok) return null;
      return result.ok ? result.data : null;
    },
    retry: false,
  });
}
