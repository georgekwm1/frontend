import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { useAuthStore } from "@/store/authStore";
import { useSearchStore } from "@/store/searchStore";

export default function Profile() {
  const navigate = useNavigate();
  const { email, logout } = useAuthStore();
  const { history, fetchHistory } = useSearchStore();

  useEffect(() => {
    fetchHistory().catch(() => {});
  }, [fetchHistory]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">Your profile</h1>
        <p className="mt-1 text-slate-600">
          Account settings and usage overview.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Email
            </p>
            <p className="mt-2 break-all text-base font-semibold text-slate-900">
              {email ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Searches run
            </p>
            <p className="mt-2 text-3xl font-bold text-brand-700">
              {history.length}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Account actions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Need to reset your password? Use the forgot-password flow.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/forgot-password")}
            >
              Reset password
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
