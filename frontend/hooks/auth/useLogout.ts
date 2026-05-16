import { logoutOnServer } from "@/lib/api/requests/auth.requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authQueryKeys } from "../useMe";
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await logoutOnServer();
      if (!result.ok) throw new Error("Невідома помилка");
      return { success: true };
    },
    onSuccess: async () => {
      queryClient.setQueryData(authQueryKeys.me, null);
    },
  });
}
