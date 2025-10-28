import { logout } from "@/repos/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
