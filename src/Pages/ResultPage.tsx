import React, { useEffect, useState } from "react";
import "./ResultPage.css";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap')
</style>;

interface JobProfile {
  title: string;
  payRate: string;
  description: string;
  whyMatched: string;
}

interface ParsedReport {
  careerReport: string;
  jobProfiles: JobProfile[];
  charredMatches: string[];
  charredExplanation: string;
  closer: string;
}

interface ResultProps {
  gptReport: string;
  setPage: (page: string) => void;
}

const parseGptReport = (gptReport: string): ParsedReport => {
  const jobProfiles: JobProfile[] = [];
  const charredMatches: string[] = [];
  let careerReport = "";
  let charredExplanation = "";
  let closer = "";

  // Pattern to extract career report assisted with chatgbt
  const careerReportPattern = /\*\*Career Report:\*\* (.*?)\n\n\*\*JOB NAME #/s;
  const careerReportMatch = careerReportPattern.exec(gptReport);
  if (careerReportMatch) {
    careerReport = careerReportMatch[1].trim();
  }

  // Pattern to extract job profiles assisted with chatgbt
  const jobPattern = /\*\*JOB NAME #(\d+): (.*?)\*\*\n\*\*DESCRIPTION:\*\* (.*?)\n\*\*WHY MATCHED:\*\* (.*?)\n\*\*PAY RATE:\*\* (.*?)\n/gs;
  let match;
  while ((match = jobPattern.exec(gptReport)) !== null) {
    const [, , title, description, whyMatched, payRate] = match;
    jobProfiles.push({ title, description, whyMatched, payRate });
  }

  // Pattern to extract closer assisted with chatgbt
  const closerPattern = /\*\*Closer:\*\* (.*?)$/s;
  const closerMatch = closerPattern.exec(gptReport);
  if (closerMatch) {
    closer = closerMatch[1].trim();
  }

  return {
    careerReport,
    jobProfiles,
    charredMatches,
    charredExplanation,
    closer,
  };
};

const ResultPage: React.FC<ResultProps> = ({ gptReport, setPage }) => {
  const [parsedReport, setParsedReport] = useState<ParsedReport>({
    careerReport: "",
    jobProfiles: [],
    charredMatches: [],
    charredExplanation: "",
    closer: "",
  });

  useEffect(() => {
    const result = parseGptReport(gptReport);
    setParsedReport(result);
  }, [gptReport]);

  return (
    <div className="result-page">
      <div className="ResultsHeader">
        <strong>An Analysis of Your Answers</strong>
        <p className="careerReport" style={{ top: "50vh" }}>
          {parsedReport.careerReport}
        </p>
      </div>

      {parsedReport.jobProfiles.map((profile, index) => (
        <div key={index} className="job-profile">
          <h3 style={{ fontFamily: 'Slamming, sans-serif' }}>
            Your #{index + 1} Flavor Profile: <strong>{profile.title}</strong>
          </h3>
          <p>
            <strong>Pay Rate:</strong> {profile.payRate}
          </p>
          <p>
            <strong>Description:</strong> {profile.description}
          </p>
          <p>
            <strong>Why Matched:</strong> {profile.whyMatched}
          </p>
        </div>
      ))}
      <div className="closer">
        <p>{parsedReport.closer}</p>
      </div>
      <button className="BackHomeButton" onClick={() => setPage("HomePage")}>Back to Home</button>
    </div>
  );
};

export default ResultPage;
