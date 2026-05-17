import { RegisterFormData } from "@/components/schemas/authSchemas";
import { registerOnServer } from "@/lib/api/requests/auth.requests";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { authQueryKeys } from "../useMe";

export function useSignup() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      const result = await registerOnServer(formData);
      if (!result.ok) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.me, user);
    },
  });
}
