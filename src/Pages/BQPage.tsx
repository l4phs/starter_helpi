/* eslint-disable no-template-curly-in-string */
//import React, { useState } from "react";
//import { Button } from "react-bootstrap";
import { useState } from "react";
import "./BQPage.css";
//import axios from "axios";
//add comment

//Code written with the assistance of Gemini AI.


interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

interface Question {
  question: string;
  answers:string[] | null;
  type: "short answer" | "multiple choice";
  selectedAnswer: string | null;
}


function BQPage({ setPage }: Props): JSX.Element {

  
    const questions1: Question [] = [
      //25 questions total
      {
        question: "Would you prefer working from home, in an office / on site, or hybrid? (pick one)",
        answers: ["Working from home", "In an office / on site", "Hybrid"],
        type: "multiple choice",
        selectedAnswer: null
      },
      {
        question: "What salary would you not feel comfortable earning less than? (pick one)",
        answers:["45K", "65K", "85K", "105K", "125K", "145K", "165K", "200K"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Do you prefer to do work individually, in a small group (2-4 people), or a team (more than 4 people)?",
        answers: ["Individually", "Small group (2-4 people)", "Team (more than 4 people)"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "How would you describe your ideal work environment in one word?",
        answers: null,
        type:"short answer",
        selectedAnswer: null
      }
      ,
      {
        question: "How can you describe yourself in one word?",
        answers: null,
        type: "short answer",
        selectedAnswer: null
      }
      ,
      {
        question: "What subject are you the best at?",
        answers: ["english", "math", "science", "physical activity"],
        type:"multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "How would you rate your ability to learn new skills? (pick one)",
        answers: ["Excellent", "Good", "Average", "Below average", "Poor"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Please select your response to the following statement: I work well in fast paced environments",
        answers: ["Yes", "No"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Would you enjoy traveling for work?",
        answers: ["Yes", "No"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "What is the maximum amount of hours you would prefer to work?",
        answers: ["15 Hrs", "30 Hrs", "40 Hrs", "60 Hrs", "As many hours as needed"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "What is your ideal shift time?",
        answers: ["7am - 3pm", "9am - 5pm", "11am-4pm", "4pm-10pm", "11pm-6am", "I want to work when I want."],
        type:"multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "List three activities you enjoy:",
        answers: null,
        type: "short answer",
        selectedAnswer: null
      },
      {
        question: "Would you prefer to be relatively sedentary or active at work?",
        answers: ["Sedentary", "Active"],
        type: "multiple choice",
        selectedAnswer: null
      },
      {
        question: "Would you prefer to dress formally at work or casually?",
        answers: ["Formal", "Casual"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "What location would you prefer to live in?",
        answers: ["City", "Suburban", "Coastal/Beach", "Urban"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "What kind of learner are you?",
        answers: ["Visual", "Auditory", "Read/Write", "Kindaesthetic"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Favorite activity? (one word answer)",
        answers: null,
        type: "short answer",
        selectedAnswer: null
      }
      ,
      {
        question: "What is your dreamjob? (one to two word answer)",
        answers: null,
        type: "short answer",
        selectedAnswer: null
      }
      ,
      {
        question: "How do you prefer to spend your workday?",
        answers: ["Solving problems","Meeting with colleagues","Creating new ideas","Following established procedures"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer working independently rather than with a team.",
        answers: ["True", "False"],
        type: "multiple choice",
        selectedAnswer: null
      },

      {
        question: "Do you enjoy helping others?",
        answers: ["Yes", "No"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer jobs that require a lot of attention to detail",
        answers: ["True", "False"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Do you enjoy working in high-pressure situations?",
        answers: ["Yes", "No"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "Please select your level of agreement with the following statement: I prefer consistent work hours over a flexible schedule.",
        answers: ["True", "False"],
        type: "multiple choice",
        selectedAnswer: null
      }
      ,
      {
        question: "How do you approach decision-making?",
        answers: ["Analyze data and facts","Trust your intuition","Consult with others for advice","Take time to weigh all options"],
        type: "multiple choice",
        selectedAnswer: null
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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions2 = [...questions1];
  //const [selectedAnswers, setSelectedAnswers] = useState({});

  const nextQuestion = () => {
    if (currentQuestionIndex < questions2.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const previousQuestion = () => {
    if (currentQuestionIndex < questions2.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

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
        <h2>Question {currentQuestionIndex +1} of {questions2.length}</h2>
        <div key= {questions2[currentQuestionIndex].question} className = "question-con">
        <h2>{questions2[currentQuestionIndex].question}</h2>
        {questions2[currentQuestionIndex].type === "multiple choice" ? (
          <ul>
            {questions2[currentQuestionIndex].answers?.map((answer) => (
              <li key={answer}>
              <input
                type="radio"
                id={answer} 
                name={`question-$.id}`}
                value={answer}
                required={true}
                //checked = {selectedAnswers[currentQuestionIndex as string] === answer}
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
        <button onClick = {previousQuestion} disabled = {currentQuestionIndex === 0}>
          Previous Question
        </button>
        <button onClick={nextQuestion} disabled={currentQuestionIndex === questions2.length - 1}>
      Next
    </button>
    </div>
  </div>
  );
}

      

export default BQPage;
