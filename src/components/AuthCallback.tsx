import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";

export function AuthCallback() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Fetch user profile with the token
      fetch("http://localhost:1337/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          setAuth(token, user);
          navigate({ to: "/" });
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          navigate({ to: "/" });
        });
    } else {
      navigate({ to: "/" });
    }
  }, [navigate, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}
