import { createLazyFileRoute } from "@tanstack/react-router";
import { AuthCallback } from "../../components/AuthCallback";

export const Route = createLazyFileRoute("/auth/callback")({
  component: AuthCallback,
});
