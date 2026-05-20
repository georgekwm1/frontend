import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AISearch from "@/pages/AISearch";
import SearchHistory from "@/pages/SearchHistory";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "10px", fontSize: "14px" },
          success: { iconTheme: { primary: "#3b6bff", secondary: "#fff" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/app/search"
          element={
            <ProtectedRoute>
              <AISearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/history"
          element={
            <ProtectedRoute>
              <SearchHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/app" element={<Navigate to="/app/search" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
