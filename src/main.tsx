import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import router from "./Router/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from "./Provider/AuthContext.tsx";
const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="dark:bg-d dark:text-dw tin">
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={qc}>
          <ThemeProvider>
            <Toaster />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </div>
);
