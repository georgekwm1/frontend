import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/app/search", label: "AI Search" },
  { to: "/app/history", label: "History" },
  { to: "/app/profile", label: "Profile" },
];

export function Navbar() {
  const navigate = useNavigate();
  const { token, email, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to={token ? "/app/search" : "/"}
          className="flex items-center gap-2 text-lg font-bold text-brand-700"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            IC
          </span>
          Interview Coach AI
        </Link>

        {token ? (
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          {token ? (
            <>
              <span className="hidden text-sm text-slate-500 sm:block">
                {email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
