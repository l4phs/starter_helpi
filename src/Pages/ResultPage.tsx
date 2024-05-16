// ResultsPage.tsx
import React from "react";

interface ResultsProps {
  gptReport: string;
  setPage: (page: string) => void;
}

const ResultsPage: React.FC<ResultsProps> = ({ gptReport, setPage }) => {
  return (
    <div>
      <h1>Results</h1>
      <p>{gptReport}</p>
      <button onClick={() => setPage("HomePage")}>Back to Home</button>
    </div>
  );
};

export default ResultsPage;
