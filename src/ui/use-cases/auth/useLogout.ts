import { logout } from "@/ui/repos/auth/auth.repo";
import { useAuthStore } from "@/ui/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      navigate({ to: "/" });
    },
  });
};
