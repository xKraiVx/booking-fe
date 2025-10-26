import { createLazyFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/home/HomePage";


export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
