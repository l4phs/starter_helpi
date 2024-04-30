import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./BQPage.css";

interface Props {
  setPage: (page: string) => void;
}

function BQPage({ setPage }: Props): JSX.Element {
  const questions = [
    "List three activities you enjoy doing?",
    "What is your ideal shift time?",
    "Would you enjoy traveling for work?",
    "What subject are you the best at?",
    "I work well in fast-paced environments.",
    "Would you prefer to be relatively sedentary or active at work?",
    "Would you prefer working from home, in an office/on site, or hybrid?",
    "Do you prefer to work individually, in a small group (2-4 people), or a team (more than 4 people)?",
    "What kind of learner are you?",
    "Do you prefer consistent work hours over a flexible schedule?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [progress, setProgress] = useState(0);

  // Calculate progress based on the number of questions answered
  const calculateProgress = () => {
    const answeredCount = answers.filter((answer) => answer.trim() !== "").length;
    const totalQuestions = questions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
    return percentage;
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

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(updatedAnswers);

    // Update progress when answering a question
    const percentage = calculateProgress();
    setProgress(percentage);
  };

  const handleSubmitAnswers = () => {
    const basicAnswers = answers.filter((answer) => answer.trim() !== "");
    if (basicAnswers.length === questions.length) {
      const data = { basicAnswers };
      axios
        .post("API_ENDPOINT_URL", data)
        .then((response) => {
          console.log(response.data);
          // Handle any further actions after successful submission
        })
        .catch((error) => {
          console.error("Error submitting basic answers:", error);
        });
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <div className="Bbody">
      <h1 className="BQH">Basic Questions Page</h1>
      <p className="BQB">
        These questions give a more BASIC analysis of the kind of career you would be best suited to! <br />
        Short answers are highly encouraged. Onwards!
      </p>
      <br />
      <div className="QuestionContainer">
        <p>Question {currentQuestionIndex + 1}</p>
        <p className="QuestionText">{questions[currentQuestionIndex]}</p>
        <input
          type="text"
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          className="AnswerInput"
        />
      </div>
      <div className="ProgressBarContainer">
        <div className="ProgressBar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="ButtonContainer">
        <Button className="BQ-PreviousButton" onClick={handlePrevious}>
          Previous
        </Button>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button className="BQ-NextButton" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button className="BQ-SubmitButton" onClick={handleSubmitAnswers}>
            Submit Basic Answers
          </Button>
        )}
      </div>
    </div>
  );
}

export default BQPage;
