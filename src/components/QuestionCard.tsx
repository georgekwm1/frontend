interface QuestionCardProps {
  index: number;
  question: string;
}

export function QuestionCard({ index, question }: QuestionCardProps) {
  return (
    <div className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
        {index}
      </div>
      <p className="text-sm leading-relaxed text-slate-800">{question}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export function EmptyState({ title, description, icon = "✨" }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
