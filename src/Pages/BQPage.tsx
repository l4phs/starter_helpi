/* eslint-disable no-template-curly-in-string */
//import React, { useState } from "react";
//import { Button } from "react-bootstrap";
import "./BQPage.css";
//import axios from "axios";

//Code written with the assistance of Gemini AI.


interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

interface Question {
  question: string;
  answers:string[] | null;
  type: "short answer" | "multiple choice";
}


function BQPage({ setPage }: Props): JSX.Element {

    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [userSelection, setUserSelection] = useState < string | null > (null);
  
    const questions1: Question [] = [
      //25 questions total
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
  
  // //const [detailedAnswers, setDetailedAnswers] = useState({});
  // const [QuestionView, setQuestionView] = useState<number>(1); // for managing the current page

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

  // function QuestionController(QstNum: string) {
  //   switch (QstNum) {
  //     case "next":
  //       if (QuestionView < 10) {
  //         setQuestionView(QuestionView + 1);
  //       }
  //       break;
  //     case "prev":
  //       if (QuestionView > 0) {
  //         setQuestionView(QuestionView - 1);
  //       }
  //       break;
  //     default:
  //       setQuestionView(QuestionView);
  //   }
  // }

  // const currentQ = questions1[currentQuestionIndex];

  return (
    <div className="Bbody">
      <h1 className="BQH"> Basic Questions</h1>
      <div className="ProgressBarBQ">
        {/* //<p>{QuestionView}</p> */}
        <div
          className="ActiveProgressBQ"
          // style={{ width: `${QuestionView * 10}%` }}
        ></div>
      </div>
      <p className="BQB">
        These questions give a more BASIC analysis of the kind of career you
        would be best suited to!
        <br></br>
        Short answers are highly encouraged. Onwards!
      </p>
      <br></br>
      <div style={{ height: "300px" }}></div>
      <div>
        {questions1.map((question) => (
            <div key={question.question} className="question-container">
        <h2>{question.question}</h2>
        {question?.type === "multiple choice" ? (
          <ul>
            {question.answers?.map((answer) => (
              <li key={answer}>
              <input
                type="radio"
                id={answer} 
                name="answer" 
                value={answer}
                //checked={userSelection === answer} 
                //onChange={handleAnswerChange}
              />
              <label htmlFor = {answer}>{answer}</label>
            </li>
            ))}
          </ul>
        ) : (
          <textarea
          //value={userSelection || ""} 
          //onChange={handleAnswerChange}
          placeholder="Please enter your answer here."
        />
        )}
        </div>
        ))}
        {/* <button disabled={!currentQuestion} onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    ); */}
    </div>
  </div>
  );
}

      

export default BQPage;