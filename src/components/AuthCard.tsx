import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-bold text-brand-700"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            IC
          </span>
          Interview Coach AI
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
      {footer && (
        <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>
      )}
    </div>
  );
}
