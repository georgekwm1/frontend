import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuthStore } from "@/store/authStore";

const features = [
  {
    icon: "🎯",
    title: "Role-specific questions",
    body: "Type any job title and get three thoughtful interview questions tuned to it.",
  },
  {
    icon: "⚡",
    title: "Powered by Llama 3.1",
    body: "Fast, JSON-structured responses via the Groq inference engine.",
  },
  {
    icon: "📚",
    title: "Persistent history",
    body: "Every search you run is saved so you can revisit and prep anytime.",
  },
];

export default function Landing() {
  const token = useAuthStore((s) => s.token);
  const cta = token ? "/app/search" : "/signup";
  const ctaLabel = token ? "Open dashboard" : "Get started — free";

  return (
    <Layout>
      <section className="mx-auto max-w-4xl pt-10 text-center sm:pt-16">
        <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          AI-powered interview prep
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Generate interview questions for{" "}
          <span className="text-brand-700">any role</span> in seconds.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Interview Coach AI takes a job title and produces tailored interview
          questions you can use to prep candidates — or yourself.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={cta}
            className="rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            {ctaLabel}
          </Link>
          {!token && (
            <Link
              to="/login"
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign in
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              {f.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{f.body}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
