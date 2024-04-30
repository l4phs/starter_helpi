import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./BQPage.css";

interface Props {
  setPage: (page: string) => void;
}

  // interface Question {
  //   question: string;
  //   answers:string[] | null;
  //   type: "short answer" | "multiple choice";
  //   answer?: string;
  // }


function BQPage({ setPage }: Props): JSX.Element {

  // function QuizC() {
  //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   const [userSelection, setUserSelection] = useState < string | null > (null);
  
  //   const questions1: Question [] = [
  //     {
  //       question: "List three activities you enjoy:"
  //       type: "short answer";
  //     }
  //     {
  //       question: "What is your ideal shift time?";
  //       type:"multiple choice";
  //     }
  //     {
  //       question:"Would you enjoy traveling for work?";
  //       type: "short answer";
  //     }
  //     {
  //       question: "What subject are you the best at?";
  //       type:"multiple choice";
  //     }
  //     {
  //       question: "Do you agree or disagree with the following statement: "
  //       type:
  //     }
  //   ]
  // }

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

  //const [detailedAnswers, setDetailedAnswers] = useState({});
  const [QuestionView, setQuestionView] = useState<number>(1); // for managing the current page


  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(updatedAnswers);
  
    // Update progress based on the number of answered questions
    const answeredCount = updatedAnswers.filter((answer) => answer.trim() !== "").length;
    const totalQuestions = questions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
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

  const handleDetailedAnswerChange = (
    questionNumber: number,
    answer: string
  ) => {
    setDetailedAnswers((prevState) => ({
      ...prevState,
      [questionNumber]: answer,
    }));
  };

  function QuestionController(QstNum: string) {
    switch (QstNum) {
      case "next":
        if (QuestionView < 10) {
          setQuestionView(QuestionView + 1);
        }
        break;
      case "prev":
        if (QuestionView > 0) {
          setQuestionView(QuestionView - 1);
        }
        break;
      default:
        setQuestionView(QuestionView);
    }
  }
  return (
    <div className="Bbody">

      <h1 className="BQH">Basic Questions Page</h1>

      <h1 className="BQH"> Basic Questions Page</h1>
      <div className="ProgressBarBQ">
        <div
          className="ActiveProgressBQ"
          style={{ width: `${QuestionView * 10}%` }}
        ></div>
      </div>

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

      <br></br>
      {QuestionView === 1 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 1</div>
          <div className="BQQuestion">List three activities you enjoy</div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
            style={{ position: "absolute", left: "48vw" }}
          >
            next
          </Button>
        </div>
      )}
      {QuestionView === 2 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 2</div>
          <div className="BQQuestion">What is your ideal shift time?</div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 3 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 3</div>
          <div className="BQQuestion">Would you enjoy traveling for work?</div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 4 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 4</div>
          <div className="BQQuestion">What subject are you the best at?</div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 5 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 5</div>
          <div className="BQQuestion">
            I work well in fast paced environments
          </div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 6 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 6</div>
          <div className="BQQuestion">
            Would you prefer to be relatively sedentary or active at work?
          </div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 7 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 7</div>
          <div className="BQQuestion">
            Would you prefer working from home, in an office / on site, or
            hybrid?
          </div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 8 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 8</div>
          <div className="BQQuestion">
            Do you prefer to do work inbridually, in a small group (2-4 people),
            or a team (more than 4 people)?
          </div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 9 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 9</div>
          <div className="BQQuestion">What kind of learner are you?</div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
          >
            next
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}
      {QuestionView === 10 && (
        <div className="Meow">
          <div className="BQQuestionNum">Question 10</div>
          <div className="BQQuestion">
            Do you prefer consistent work hours over a flexible schedule?
          </div>
          <input
            type="text"
            className="textboxclassBQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
          <Button
            className="Submit-Button"
            onClick={handleSubmitAnswers}
          >
            Submit Detailed Answers
          </Button>
        </div>
      )}

    </div>
  );
}

export default BQPage;
