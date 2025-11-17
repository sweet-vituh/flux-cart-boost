import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <App />
  </TooltipProvider>
);
