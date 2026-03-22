import { useQuery } from "@tanstack/react-query";
import {
  getAnalyses,
  ANALYSES_QUERY_KEY,
  type AnalysisStatus,
} from "../api/analyses";
import { Link } from "react-router-dom";

export const Status = ({ status }: { status: AnalysisStatus }) => {
  const styles = {
    DRAFT: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    RUNNING: "bg-blue-50 text-blue-700 ring-blue-200",
    COMPLETED: "bg-green-50 text-green-700 ring-green-200",
    FAILED: "bg-red-50 text-red-700 ring-red-200",
  } as Record<AnalysisStatus, string>;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const AnalysesListPage = () => {
  const { data: analyses, isLoading } = useQuery({
    queryFn: getAnalyses,
    queryKey: ANALYSES_QUERY_KEY,
  });

  if (isLoading) {
    return <p className="text-2xl font-semibold tracking-tight">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Analyses
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review saved contract analyses and their extracted terms.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">
                  Created
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">
                  Summary
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 bg-white">
              {analyses &&
                analyses.map((analysis) => (
                  <tr key={analysis.id} className="transition hover:bg-zinc-50">
                    <td className="px-4 py-4">
                      <Link
                        to={`/analyses/${analysis.id}`}
                        className="font-medium text-zinc-900 hover:text-zinc-700"
                      >
                        {analysis.title}
                      </Link>
                    </td>

                    <td className="px-4 py-4">
                      <Status status={analysis.status} />
                    </td>

                    <td className="px-4 py-4 text-zinc-500">
                      {new Date(analysis.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-zinc-500">
                      {analysis.resultJson
                        ? "Completed analysis available"
                        : "No results yet"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
