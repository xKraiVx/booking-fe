import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import type { JSX } from "react";
import { useAuthStore } from "@/store/authStore";
import { getProfile } from "@/repos/auth.repo";
import Loader from "@/common/Loader";

export default function AuthCallbackPage(): JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        // Store token temporarily
        Cookies.set("auth_token", token, { expires: 7 });

        try {
          // Fetch user profile
          const user = await getProfile();
          setAuth(token, user);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          Cookies.remove("auth_token");
        }
      }

      navigate({ to: "/" });
    };

    handleAuth();
  }, [navigate, setAuth]);

  return <Loader message="Completing authentication..." />;
}
