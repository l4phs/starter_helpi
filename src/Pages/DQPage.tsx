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
      <div className="ProgressBar">
        <div
          className="ActiveProgress"
          style={{ width: `${QuestionView * 10}%` }}
        ></div>
      </div>
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

      {/* Detailed questions and input fields */}
      {QuestionView === 1 && (
        <div className="Meow">
          <div className="Det-Question">Question 1</div>
          <div className="det-body">
            What kind of work environment do you prefer? Describe your ideal
            workplace.
          </div>
          <input
            type="text"
            className="textboxclassDQ"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="NextButton"
            onClick={() => QuestionController("next")}
            style={{ position: 'absolute', left: '48vw' }}
          >
            next
          </Button>
        </div>
      )}
      {QuestionView === 2 && (
        <div className="Meow">
          <div className="Det-Question">Question 2 </div>
          <div className="det-body">
            What values are most important to you in your career? (e.g.,
            creativity, financial stability, work-life balance)
          </div>
          <input
            type="text"
            className="textboxclassDQ"
            onChange={(e) => handleDetailedAnswerChange(2, e.target.value)}
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
          <div className="Det-Question">Question 3 </div>
          <div className="det-body">Is job stability important to you?</div>
          <input
            type="text"
            className="textboxclassDQ"
            onChange={(e) => handleDetailedAnswerChange(3, e.target.value)}
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
          <div className="Det-Question">Question 4 </div>
          <div className="det-body">
            What kind of roles or projects do you most enjoy?
          </div>
          <div className="options">
            <Form.Check
              inline
              type="checkbox"
              id="project-check-creative"
              label="Creative Projects"
              name="project"
              value="creative projects"
              checked={project.includes("creative projects")}
              onChange={updateProject}
            />
            <Form.Check
              inline
              type="checkbox"
              id="project-check-analytical"
              label="Analytical Projects"
              name="project"
              value="analytical project"
              checked={project.includes("analytical project")}
              onChange={updateProject}
            />
            <Form.Check
              inline
              type="checkbox"
              id="project-check-leadership"
              label="Leadership Projects"
              name="project"
              value="leadership projects"
              checked={project.includes("leadership projects")}
              onChange={updateProject}
            />
            <Form.Check
              inline
              type="checkbox"
              id="project-check-handson"
              label="Hands-on Projects"
              name="project"
              value="hands-on projects"
              checked={project.includes("hands-on projects")}
              onChange={updateProject}
            />
            <Form.Check
              inline
              type="checkbox"
              id="project-check-customerservice"
              label="Customer Service Projects"
              name="project"
              value="customer service projects"
              checked={project.includes("customer service projects")}
              onChange={updateProject}
            />
          </div>
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
          <div className="Det-Question">Question 5 </div>
          <div className="det-body">
            How often do you rely on data and facts when making decisions?
          </div>
          <input
            type="text"
            className="textboxclassDQ"
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
          <div className="Det-Question">Question 6 </div>
          <div className="det-body">
            How do you feel about public speaking and/or presenting ideas to
            groups?
          </div>
          <input
            type="text"
            className="textboxclassDQ"
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
          <div className="Det-Question">Question 7 </div>
          <div className="det-body">
            What skills do you enjoy most in your work? Select all that apply.
          </div>
          <input type="text" className="textboxclassDQ" />
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
          <div className="Det-Question">Question 8 </div>
          <div className="det-body">
            Describe a professional goal you've set for yourself and the plans
            you are currently taking to achieve it.
          </div>
          <input type="text" className="textboxclassDQ" />
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
          <div className="Det-Question">Question 9 </div>
          <div className="det-body">
            What career fields intrest you the most? Select all that apply.
          </div>
          <input type="text" className="textboxclassDQ" />
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
          <div className="Det-Question">Question 10 </div>
          <div className="det-body">
            How open are you to trying new methods or approaches to your work?
          </div>
          <input type="text" className="textboxclassDQ" />
          <Button
            className="Submit-Button"
            onClick={handleSubmitDetailedAnswers}
          >
            Submit Detailed Answers
          </Button>
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
        </div>
      )}

    </div>
  );
}

export default DQPage;
