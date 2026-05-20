import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { EmptyState, QuestionCard } from "@/components/QuestionCard";
import { useSearchStore } from "@/store/searchStore";
import { extractError } from "@/lib/api";

const SUGGESTIONS = [
  "Senior Backend Engineer",
  "Product Manager",
  "Data Scientist",
  "Frontend Developer",
  "DevOps Engineer",
];

export default function AISearch() {
  const { ask, searching, currentQuery, currentResults } = useSearchStore();
  const [input, setInput] = useState("");

  const run = async (q: string) => {
    if (!q.trim()) return;
    setInput(q);
    try {
      await ask(q.trim());
    } catch (err) {
      toast.error(extractError(err, "Could not generate questions"));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Generate interview questions
          </h1>
          <p className="mt-2 text-slate-600">
            Enter a job title or role and we'll generate 3 thoughtful interview
            questions tailored to it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="e.g. Senior Backend Engineer"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              loading={searching}
              disabled={!input.trim()}
            >
              {searching ? "Generating…" : "Generate"}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-slate-500">
              Try:
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        <section className="mt-10">
          {searching ? (
            <Loader size="lg" label="Generating questions…" className="py-12" />
          ) : currentResults.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Questions for{" "}
                  <span className="text-brand-700">{currentQuery}</span>
                </h2>
                <span className="text-xs text-slate-500">
                  {currentResults.length} questions
                </span>
              </div>
              <div className="space-y-3">
                {currentResults.map((q, i) => (
                  <QuestionCard key={i} index={i + 1} question={q} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="No results yet"
              description="Submit a role above to see AI-generated interview questions."
              icon="🎯"
            />
          )}
        </section>
      </div>
    </Layout>
  );
}
