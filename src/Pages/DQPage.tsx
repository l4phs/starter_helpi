import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./DQPage.css";

interface Props {
  setPage: (page: string) => void;
}

function DQPage({ setPage }: Props): JSX.Element {
  const questions = [
    {
      id: 1,
      text: "What kind of work environment do you prefer? Describe your ideal workplace.",
      type: "text",
    },
    {
      id: 2,
      text: "What values are most important to you in your career?",
      type: "text",
    },
    {
      id: 3,
      text: "Is job stability important to you?",
      type: "text",
    },
    {
      id: 4,
      text: "What kind of roles or projects do you most enjoy?",
      type: "checkbox",
      options: [
        "Creative Projects",
        "Analytical Projects",
        "Leadership Projects",
        "Hands-on Projects",
        "Customer Service Projects",
      ],
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitDetailedAnswers = () => {
    const data = answers.filter((answer) => answer.trim() !== "");
    axios
      .post("API_ENDPOINT_URL", { detailedAnswers: data })
      .then((response) => {
        console.log(response.data);
        // Handle any further actions after successful submission
      })
      .catch((error) => {
        console.error("Error submitting detailed answers:", error);
      });
  };

  // Calculate progress based on the number of questions answered
  const calculateProgress = () => {
    const answeredCount = answers.filter((answer) => answer.trim() !== "").length;
    const totalQuestions = questions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
    return percentage;
  };

  return (
    <div className="Dbody">
      <div className="DQH">Detailed Questions Page</div>
      <div className="DQB">
        <p>
          These questions give a more IN-DEPTH analysis of the kind of career
          you would be best suited to! <br />
          Long, detailed answers are highly encouraged. Onwards!
        </p>
      </div>

      {/* Render current question dynamically */}
      {questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return (
            <div className="Det-Question" key={question.id}>
              <p>Question {question.id}</p>
              <div className="det-body">{question.text}</div>
              {question.type === "text" ? (
                <input
                  type="text"
                  className="textboxclass"
                  value={answers[currentQuestionIndex]}
                  onChange={handleAnswerChange}
                />
              ) : null}
            </div>
          );
        }
        return null;
      })}

      {/* Progress bar */}
      <div className="ProgressBarContainer">
        <div className="ProgressBar" style={{ width: `${calculateProgress()}%` }}></div>
      </div>

      {/* Navigation buttons */}
      <div className="ButtonContainer">
        <Button className="DQ-PreviousButton" onClick={handlePrevious}>
          Previous
        </Button>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button className="DQ-NextButton" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button className="DQ-SubmitButton" onClick={handleSubmitDetailedAnswers}>
            Submit Detailed Answers
          </Button>
        )}
      </div>
    </div>
  );
}

export default DQPage;
