import React from "react";

interface Props {
  answers: Record<string, string | string[]>;
}

const ResultsPage: React.FC<Props> = ({ answers }) => {
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
};

export default ResultsPage;
