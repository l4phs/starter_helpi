// ResultPage.tsx
import React, { useEffect, useState } from "react";
import "./ResultPage.css";

interface JobProfile {
  title: string;
  payRate: string;
  description: string;
  whyMatched: string;
}

interface ParsedReport {
  jobProfiles: JobProfile[];
  charredMatches: string[];
}

interface ResultsProps {
  gptReport: string;
  setPage: (page: string) => void;
}

const parseGptReport = (gptReport: string): ParsedReport => {
  const jobProfiles: JobProfile[] = [];
  const charredMatches: string[] = [];

  // Pattern to extract job profiles
  const jobPattern = /\d+\.\s*\*\*(.*?)\*\*\n\s*-\s*\*\*Pay Rate:\*\*\s*(.*?)\n\s*-\s*\*\*Description:\*\*\s*(.*?)\n\s*-\s*\*\*Why Matched:\*\*\s*(.*?)(?=\n\d+\.|\n### Jobs That Did Not Match|$)/gs;

  let match;
  while ((match = jobPattern.exec(gptReport)) !== null) {
    const [, title, payRate, description, whyMatched] = match;
    jobProfiles.push({ title, payRate, description, whyMatched });
  }

  // Pattern to extract charred matches
  const charredPattern = /### Jobs That Did Not Match:\n\s*(-\s*\*\*.*?\*\*:.*?(?=\n-|\n$))/gs;
  let charredMatch;
  while ((charredMatch = charredPattern.exec(gptReport)) !== null) {
    charredMatches.push(charredMatch[1].trim());
  }

  return { jobProfiles, charredMatches };
};

const ResultPage: React.FC<ResultsProps> = ({ gptReport, setPage }) => {
  const [parsedReport, setParsedReport] = useState<ParsedReport>({ jobProfiles: [], charredMatches: [] });

  useEffect(() => {
    const result = parseGptReport(gptReport);
    setParsedReport(result);
  }, [gptReport]);

  return (
    <div className="result-page">
      <h1>Your Roasted Results</h1>
      <h2>An Analysis of Your Answers</h2>

      {parsedReport.jobProfiles.map((profile, index) => (
        <div key={index} className="job-profile">
          <h3>Your #{index + 1} Flavor Profile:</h3>
          <p><strong>Job Name:</strong> {profile.title}</p>
          <p><strong>Pay Rate:</strong> {profile.payRate}</p>
          <p><strong>Description:</strong> {profile.description}</p>
          <p><strong>Why Matched:</strong> {profile.whyMatched}</p>
        </div>
      ))}

      <h3>Flavors Too Bitter to Peruse or Your Charred Matches:</h3>
      <ul>
        {parsedReport.charredMatches.map((job, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: job }}></li>
        ))}
      </ul>

      <button onClick={() => setPage("HomePage")}>Back to Home</button>
    </div>
  );
};

export default ResultPage;
