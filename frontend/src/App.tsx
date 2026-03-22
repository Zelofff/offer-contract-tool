import { Route, Routes } from "react-router-dom";
import { AnalysesListPage } from "./pages/AnalysesListPage";
import { NewAnalysisPage } from "./pages/NewAnalysisPage";
import { AnalysisDetailsPage } from "./pages/AnalysisDetailsPage";

export const App = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Routes>
        <Route path="/" element={<AnalysesListPage />} />
        <Route path="/new" element={<NewAnalysisPage />} />
        <Route path="/analyses/:id" element={<AnalysisDetailsPage />} />
      </Routes>
    </div>
  );
};
