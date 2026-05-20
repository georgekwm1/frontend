import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { authApi, extractError } from "@/lib/api";
import { validateEmail } from "@/lib/utils";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
      toast.success("Reset instructions sent to your email");
    } catch (err) {
      toast.error(extractError(err, "Could not send reset email"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout centered>
      <AuthCard
        title="Forgot password?"
        subtitle={
          sent
            ? "Check your inbox for a reset token, then continue."
            : "We'll send a reset token to your email."
        }
        footer={
          <>
            Remember it?{" "}
            <Link className="font-semibold text-brand-700" to="/login">
              Back to sign in
            </Link>
          </>
        }
      >
        {sent ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              If an account exists for <strong>{email}</strong>, you'll receive
              an email with a token shortly.
            </div>
            <Button
              fullWidth
              size="lg"
              onClick={() =>
                navigate(`/reset-password?email=${encodeURIComponent(email)}`)
              }
            >
              I have a token — reset password
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              error={error}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" loading={loading} fullWidth size="lg">
              Send reset instructions
            </Button>
          </form>
        )}
      </AuthCard>
    </Layout>
  );
}
