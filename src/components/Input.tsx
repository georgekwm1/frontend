import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...rest }, ref) => {
    const inputId = id ?? rest.name ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          {...rest}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm",
            "text-slate-900 placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-brand-400",
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-slate-300 focus:border-brand-400",
            className,
          )}
        />
        {error ? (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-slate-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
