import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { useAuthStore } from "@/store/authStore";
import { extractError } from "@/lib/api";
import { validateEmail, validatePassword } from "@/lib/utils";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, login, loading } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!validateEmail(form.email)) next.email = "Enter a valid email";
    const pwErr = validatePassword(form.password);
    if (pwErr) next.password = pwErr;
    if (form.password !== form.confirm)
      next.confirm = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success("Account created — signing you in…");
      await login({ email: form.email, password: form.password });
      navigate("/app/search", { replace: true });
    } catch (err) {
      toast.error(extractError(err, "Could not create account"));
    }
  };

  return (
    <Layout centered>
      <AuthCard
        title="Create your account"
        subtitle="Generate role-specific interview questions in seconds."
        footer={
          <>
            Already have an account?{" "}
            <Link className="font-semibold text-brand-700" to="/login">
              Sign in
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full name"
            placeholder="Jane Doe"
            value={form.name}
            error={errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            placeholder="At least 6 characters"
            value={form.password}
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={form.confirm}
            error={errors.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          <Button type="submit" loading={loading} fullWidth size="lg">
            Create account
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
}
