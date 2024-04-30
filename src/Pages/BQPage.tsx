/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./BQPage.css";
import axios from "axios";


interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

interface Question {
  question: string;
  answers:string[] | null;
  type: "short answer" | "multiple choice";
}
// ,
//       {
//         question:
//         answers:
//         type:
//       }


function BQPage({ setPage }: Props): JSX.Element {

  function QuizC() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userSelection, setUserSelection] = useState < string | null > (null);
  
    const questions1: Question [] = [
      {
        question: "Would you prefer working from home, in an office / on site, or hybrid? (pick one)",
        answers: ["Working from home", "In an office / on site", "Hybrid"],
        type: "multiple choice"
      },
      {
        question: "What salary would you not feel comfortable earning less than? (pick one)",
        answers:["45K", "65K", "85K", "105K", "125K", "145K", "165K", "200K"],
        type: "multiple choice"
      }
      ,
      {
        question: "Do you prefer to do work individually, in a small group (2-4 people), or a team (more than 4 people)?",
        answers: ["Individually", "Small group (2-4 people)", "Team (more than 4 people)"],
        type: "multiple choice"
      }
      ,
      {
        question: "How would you describe your ideal work environment in one word?",
        answers: null,
        type:"short answer"
      }
      ,
      {
        question: "How can you describe yourself in one word?",
        answers: null,
        type: "short answer"
      }
      ,
      {
        question: "What subject are you the best at?",
        answers: ["english", "math", "science", "physical activity"],
        type:"multiple choice",
      }
      ,
      {
        question: "How would you rate your ability to learn new skills? (pick one)",
        answers: ["Excellent", "Good", "Average", "Below average", "Poor"],
        type: "multiple choice"
      }
      ,
      {
        question: "Please select your response to the following statement: I work well in fast paced environments",
        answers: ["Yes", "No"],
        type: "multiple choice"
      }
      ,
      {
        question: "Would you enjoy traveling for work?",
        answers: ["Yes", "No"],
        type: "multiple choice"
      }
      ,
      {
        question: "What is the maximum amount of hours you would prefer to work?",
        answers: ["15 Hrs", "30 Hrs", "40 Hrs", "60 Hrs", "As many hours as needed"],
        type: "multiple choice"
      }
      ,
      {
        question: "What is your ideal shift time?",
        answers: ["7am - 3pm", "9am - 5pm", "11am-4pm", "4pm-10pm", "11pm-6am", "I want to work when I want."],
        type:"multiple choice"
      }
      ,
      {
        question: "List three activities you enjoy:",
        answers: null,
        type: "short answer"
      },
      {
        question: "Would you prefer to be relatively sedentary or active at work?",
        answers: ["Sedentary", "Active"],
        type: "multiple choice"
      },
      {
        question: "Would you prefer to dress formally at work or casually?",
        answers: ["Formal", "Casual"],
        type: "multiple choice"
      }
      ,
      {
        question: "What location would you prefer to live in?",
        answers: ["City", "Suburban", "Coastal/Beach", "Urban"],
        type: "multiple choice"
      }
      ,
      {
        question: "What kind of learner are you?",
        answers: ["Visual", "Auditory", "Read/Write", "Kindaesthetic"],
        type: "multiple choice"
      }
      ,
      {
        question: "Favorite activity? (one word answer)",
        answers: null,
        type: "short answer"
      }
      ,
      {
        question: "What is your dreamjob? (one to two word answer)",
        answers: null,
        type: "short answer"
      }
      ,
      {
        question: "How do you prefer to spend your workday?",
        answers: ["Solving problems","Meeting with colleagues","Creating new ideas","Following established procedures"],
        type: "multiple choice"
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer working independently rather than with a team.",
        answers: ["True", "False"],
        type: "multiple choice"
      },

      {
        question: "Do you enjoy helping others?",
        answers: ["Yes", "No"],
        type: "multiple choice"
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer jobs that require a lot of attention to detail",
        answers: ["True", "False"],
        type: "multiple choice"
      }
      ,
      {
        question: "Do you enjoy working in high-pressure situations?",
        answers: ["Yes", "No"],
        type: "multiple choice"
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer consistent work hours over a flexible schedule.",
        answers: ["True", "False"],
        type: "multiple choice"
      }
      ,
      {
        question: "How do you approach decision-making?",
        answers: ["Analyze data and facts","Trust your intuition","Consult with others for advice","Take time to weigh all options"],
        type: "multiple choice"
      }
    ]
}
  //const [detailedAnswers, setDetailedAnswers] = useState({});
  const [QuestionView, setQuestionView] = useState<number>(1); // for managing the current page

  // const handleSubmitDetailedAnswers = () => {
  //   axios
  //     .post("API_ENDPOINT_URL", detailedAnswers)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting detailed answers: " + error); // Concatenate error message
  //     });
  // };

  // const handleDetailedAnswerChange = (
  //   questionNumber: number,
  //   answer: string
  // ) => {
  //   setDetailedAnswers((prevState) => ({
  //     ...prevState,
  //     [questionNumber]: answer,
  //   }));
  //   return 0;
  // };

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
          style={{ width: `${QuestionView * 10}%` }}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
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
            //onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button
            className="PrevButton"
            onClick={() => QuestionController("prev")}
          >
            Previous
          </Button>
          <Button
            className="Submit-Button"
            //onClick={handleSubmitDetailedAnswers}
          >
            Submit Detailed Answers
          </Button>
        </div>
      )}
    </div>
  );
}

export default BQPage;
