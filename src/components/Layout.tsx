import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  centered?: boolean;
}

export function Layout({ children, centered }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main
        className={
          centered
            ? "flex flex-1 items-center justify-center px-4 py-10"
            : "mx-auto w-full max-w-6xl flex-1 px-4 py-8"
        }
      >
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Interview Coach AI &mdash; Built with
        React, TypeScript, Tailwind &amp; Zustand
      </footer>
    </div>
  );
}
