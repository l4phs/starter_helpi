import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./BQPage.css";
import axios from "axios";


interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

function BQPage({ setPage }: Props): JSX.Element {
  const [detailedAnswers, setDetailedAnswers] = useState({});
  const [QuestionView, setQuestionView] = useState<number>(1); // for managing the current page

  const handleSubmitDetailedAnswers = () => {
    axios
      .post("API_ENDPOINT_URL", detailedAnswers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting detailed answers: " + error); // Concatenate error message
      });
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
      <h1 className="BQH"> Basic Questions Page</h1>
      <div className="ProgressBarBQ">
        <p>{QuestionView}</p>
        <div
          className="ActiveProgressBQ"
          style={{ width: "${QuestionView * 10}%" }}
        ></div>
      </div>
      <p className="BQB">
        These questions give a more BASIC analysis of the kind of career you
        would be best suited to!
        <br></br>
        Short asnwers are highly encouraged. Onwards!
      </p>
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
          <p>{QuestionView}</p>
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
          <p>{QuestionView}</p>
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
          <p>{QuestionView}</p>
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
          <p>{QuestionView}</p>
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
          <p>{QuestionView}</p>

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
          <p>{QuestionView}</p>

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
          <p>{QuestionView}</p>

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
          <p>{QuestionView}</p>

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
          <p>{QuestionView}</p>

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
            onClick={handleSubmitDetailedAnswers}
          >
            Submit Detailed Answers
          </Button>
        </div>
      )}
    </div>
  );
}

export default BQPage;
