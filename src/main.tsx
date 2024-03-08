import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Router/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from "./Provider/AuthContext.tsx";
const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="dark:bg-d dark:text-dw tin conti">
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </div>
);
