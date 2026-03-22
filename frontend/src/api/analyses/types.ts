export type AnalysisStatus = "DRAFT" | "RUNNING" | "COMPLETED" | "FAILED";

export type Analysis = {
  id: string;
  title: string;
  sourceText: string;
  status: AnalysisStatus;
  resultJson: unknown | null;
  createdAt: string;
  completedAt: string | null;
};

export type CreateAnalysisInput = {
  title: string;
  sourceText: string;
};
