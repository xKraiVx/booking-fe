import { logout } from "@/repos/auth";
import { useAuthStore } from "@/store/authStore";
import { getProfileQueryKey } from "@/use-cases/auth/useGetProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
     const { clearAuth } = useAuthStore();


    const queryClient = useQueryClient();

    return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getProfileQueryKey });
        clearAuth();
    }
})
};