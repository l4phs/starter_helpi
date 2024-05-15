import React from "react";
import BQPage from "./BQPage";

interface Props {
  answers: Record<string, string | string[]>;
  careerReport: string;
}

/*const ResultsPage: React.FC<Props> = ({ answers }) => {
  return (
    <div>
      <h1>Results</h1>
      
      <div>
        {Object.entries(answers).map(([question, answer]) => (
          <div key={question}>
            <h3>{question}</h3>
            {Array.isArray(answer) ? (
              <ul>
                {answer.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};*/

function ResultsPage(props: Props): JSX.Element {
  return (
    <div>
      <h2>Results</h2>
      <p>{props.careerReport}</p>
      {/* Render additional content based on careerReport */}
    </div>
  );
}

export default ResultsPage;
