import { useQuery } from "@tanstack/react-query";
import { getAnalysisById, getAnalysisByIdQueryKey } from "../api/analyses";
import { Status } from "./AnalysesListPage";
import { useParams } from "react-router-dom";

export const AnalysisDetailsPage = () => {
  const params = useParams();
  const { data: analysis, isLoading } = useQuery({
    queryFn: () => getAnalysisById(params.id!),
    queryKey: getAnalysisByIdQueryKey(params.id!),
    enabled: Boolean(params.id),
  });

  if (isLoading) {
    return "loading";
  }

  if (!analysis) {
    return null;
  }

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {analysis.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <Status status={analysis.status} />
            <span>{new Date(analysis.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">
            Source contract
          </h2>
          <pre className="mt-4 max-h-125 overflow-auto whitespace-pre-wrap rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
            {analysis.sourceText}
          </pre>
        </section>

        <aside className="space-y-6">{/* summary cards */}</aside>
      </div>
    </>
  );
};
