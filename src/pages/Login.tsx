import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { useAuthStore } from "@/store/authStore";
import { extractError } from "@/lib/api";
import { validateEmail } from "@/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as { state: { from?: string } | null };
  const { login, loading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!validateEmail(form.email)) next.email = "Enter a valid email";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(form);
      toast.success("Welcome back!");
      const dest = location.state?.from ?? "/app/search";
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(extractError(err, "Login failed"));
    }
  };

  return (
    <Layout centered>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to keep generating interview questions."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link className="font-semibold text-brand-700" to="/signup">
              Sign up
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-brand-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" loading={loading} fullWidth size="lg">
            Sign in
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
}
