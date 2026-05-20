import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout centered>
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-brand-700">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    </Layout>
  );
}
