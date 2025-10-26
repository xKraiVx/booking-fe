import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import type { JSX } from "react";
import { useAuthStore } from "@/store/authStore";
import Loader from "@/common/Loader";

export default function AuthCallbackPage(): JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setAuth(token);
    }
    navigate({ to: "/" });
  }, [navigate, setAuth]);

  return (
    <Loader message="Completing authentication..." />
  );
}
