import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Layout } from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/QuestionCard";
import { useSearchStore } from "@/store/searchStore";
import { extractError } from "@/lib/api";

export default function SearchHistory() {
  const { history, loadingHistory, fetchHistory } = useSearchStore();
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchHistory().catch((err) =>
      toast.error(extractError(err, "Could not load history")),
    );
  }, [fetchHistory]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return history;
    return history.filter(
      (h) =>
        h.question.toLowerCase().includes(q) ||
        h.results.some((r) => r.question.toLowerCase().includes(q)),
    );
  }, [history, filter]);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Search history
            </h1>
            <p className="mt-1 text-slate-600">
              Review every role you've generated questions for.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() =>
              fetchHistory().catch((err) =>
                toast.error(extractError(err, "Refresh failed")),
              )
            }
            loading={loadingHistory}
          >
            Refresh
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Filter by role or question text…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {loadingHistory && history.length === 0 ? (
          <Loader size="lg" label="Loading history…" className="py-12" />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={filter ? "No matches" : "No history yet"}
            description={
              filter
                ? "Try a different search term."
                : "Run your first AI search to start building history."
            }
            icon="📚"
          />
        ) : (
          <ul className="space-y-3">
            {filtered.map((item, idx) => {
              const isOpen = expanded[idx] ?? false;
              return (
                <li
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() =>
                      setExpanded((e) => ({ ...e, [idx]: !isOpen }))
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.question}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.results.length} questions
                      </p>
                    </div>
                    <span
                      className={`text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 py-4">
                      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
                        {item.results.map((r, i) => (
                          <li key={i}>{r.question}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Layout>
  );
}
