import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { authApi, extractError } from "@/lib/api";
import { validateEmail, validatePassword } from "@/lib/utils";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    token: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = params.get("email") ?? "";
    const token = params.get("token") ?? "";
    if (email || token) setForm((f) => ({ ...f, email, token }));
  }, [params]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!validateEmail(form.email)) next.email = "Enter a valid email";
    if (!form.token) next.token = "Reset token is required";
    const pwErr = validatePassword(form.new_password);
    if (pwErr) next.new_password = pwErr;
    if (form.new_password !== form.confirm_password)
      next.confirm_password = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authApi.resetPassword(form);
      toast.success("Password updated — please sign in");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(extractError(err, "Could not reset password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout centered>
      <AuthCard
        title="Reset your password"
        subtitle="Paste the token from your email and choose a new password."
        footer={
          <>
            Need a new token?{" "}
            <Link className="font-semibold text-brand-700" to="/forgot-password">
              Request again
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Reset token"
            value={form.token}
            error={errors.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
          />
          <Input
            label="New password"
            type="password"
            value={form.new_password}
            error={errors.new_password}
            onChange={(e) =>
              setForm({ ...form, new_password: e.target.value })
            }
          />
          <Input
            label="Confirm new password"
            type="password"
            value={form.confirm_password}
            error={errors.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
          />
          <Button type="submit" loading={loading} fullWidth size="lg">
            Reset password
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
}
