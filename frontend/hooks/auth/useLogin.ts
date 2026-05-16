"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginOnServer } from "@/lib/api/requests/auth.requests";
import type { LoginFormData } from "@/components/schemas/authSchemas";
import { authQueryKeys } from "@/hooks/useMe";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await loginOnServer(data);

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSuccess: async (user) => {
      queryClient.setQueryData(authQueryKeys.me, user);
    },
  });
}
