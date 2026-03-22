import type { Analysis, CreateAnalysisInput } from "./types";

const API_BASE_URL = "http://localhost:3001";

export const getAnalyses = async (): Promise<Analysis[]> => {
  const response = await fetch(`${API_BASE_URL}/analyses`);

  if (!response.ok) {
    throw new Error("Failed to fetch analyses");
  }

  return response.json();
};

export const getAnalysisById = async (id: string): Promise<Analysis> => {
  const response = await fetch(`${API_BASE_URL}/analyses/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch analysis");
  }

  return response.json();
};

export const createAnalysis = async (
  input: CreateAnalysisInput
): Promise<Analysis> => {
  const response = await fetch(`${API_BASE_URL}/analyses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create analysis");
  }

  return response.json();
};
