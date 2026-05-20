import { cn } from "@/lib/utils";

interface LoaderProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

export function Loader({ label, className, size = "md" }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-slate-500",
        className,
      )}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-brand-500 border-r-transparent",
          sizes[size],
        )}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
