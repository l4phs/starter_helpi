/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-template-curly-in-string */
//import { Button } from "react-bootstrap";
import { useState } from "react";
import "./BQPage.css";
import OpenAI from "openai";
import { Button } from "react-bootstrap";


//Code written with the assistance of Gemini AI.

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
  apiKey: string; // Add apiKey as a prop
}

interface Question {
  question: string;
  answers: string[] | null;
  type: "short answer" | "multiple choice";
}

function BQPage(props: Props): JSX.Element {
  console.log("API Key:", props.apiKey);

  const questions: Question[] = [
    //25 questions total
    {
      question:
        "Would you prefer working from home, in an office / on site, or hybrid? (pick one)",
      answers: ["Working from home", "In an office / on site", "Hybrid"],
      type: "multiple choice",
    },
    {
      question:
        "What salary would you not feel comfortable earning less than? (pick one)",
      answers: ["50K", "70K","100K", "160K", "200K"],
      type: "multiple choice",
    },
    {
      question:
        "Do you prefer to do work individually, in a small group (2-4 people), or a team (more than 4 people)?",
      answers: [
        "Individually",
        "Small group (2-4 people)",
        "Team (more than 4 people)",
      ],
      type: "multiple choice",
    },
    {
      question:
        "How would you describe your ideal work environment in one word?",
      answers: null,
      type: "short answer",
    },
    {
      question: "How can you describe yourself in one word?",
      answers: null,
      type: "short answer",
    },
    {
      question: "What subject are you the best at?",
      answers: ["english", "math", "science", "physical activity"],
      type: "multiple choice",
    },
    {
      question:
        "Please select your response to the following statement: I work well in fast paced environments",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question: "Would you enjoy traveling for work?",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question: "What is the maximum amount of hours you would prefer to work?",
      answers: [
        "30 Hrs",
        "40 Hrs",
        "60 Hrs",
        "As many hours as needed",
      ],
      type: "multiple choice",
    },
    {
      question: "What is your ideal shift time?",
      answers: [
        "Early Bird (7am - 3pm)",
        "Regular Hours (9am - 5pm)",
        "Overnight (7pm - 7am)",
        "I want to work when I want.",
      ],
      type: "multiple choice",
    },
    {
      question:
        "Would you prefer to be relatively sedentary or active at work?",
      answers: ["Sedentary", "Active"],
      type: "multiple choice",
    },
    {
      question: "Would you prefer to dress formally at work or casually?",
      answers: ["Formal", "Casual"],
      type: "multiple choice",
    },
    {
      question: "Favorite activity? (one word answer)",
      answers: null,
      type: "short answer",
    },
    {
      question: "What is your dreamjob? (one to two word answer)",
      answers: null,
      type: "short answer",
    },
    {
      question: "Do you enjoy helping others?",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question:
        "Please select your level of agreement with the following statement: I prefer jobs that require a lot of attention to detail",
      answers: ["True", "False"],
      type: "multiple choice",
    },
    {
      question: "Do you enjoy working in high-pressure situations?",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question:
        "Please select your level of agreement with the following statement: I prefer consistent work hours over a flexible schedule.",
      answers: ["True", "False"],
      type: "multiple choice",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false); // State to track if answers have been submitted
  const [check, setCheck] = useState(false);
  const [gptReport, setGptReport] = useState("");

  const openai = new OpenAI({
    apiKey: props.apiKey,
    dangerouslyAllowBrowser: true,
  });

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

  const handleAnswerChange = (selectedAnswer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    const answeredCount = updatedAnswers.filter((answer) => answer !== null)
      .length;
    const totalQuestions = questions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
    setProgress(percentage);
  };

  const handleReturn = () => {
    setSubmitted(false);
  }

  const handleResponseCheck = () => {
    setSubmitted(true);
  }

  const handleSubmitBasicAnswers = async () => {
    const userContent = answers
      .map((answer, index) => `${questions[index].question}: ${answer}`)
      .join("\n");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
            "You are a career genie helping lead to the greatest career choices while implementing your love for coffee. Give a detailed paragraph analysis of the answers given and then the top 3 job choices formatted as follows: job name,pay rate, description, and why matched. Then generate a short list of jobs that did not match the answers provided. Have a sweet closer about coffee",          },
          {
            role: "user",
            content: userContent,
          },
        ],
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const careerReport = response.choices[0].message.content || "";
      console.log("Career Report:", careerReport);
      setGptReport(careerReport);

     // Update state to indicate answers have been submitted
     setCheck(true);
    } catch (error) {
      console.error("Error generating career insights:", error);
      // Handle error or display error message
    }
  };

  return (
    <div className="BQPage">
      <div className="Background"></div>
      {submitted ? (
        // Display submitted answers if submitted is true
        <div className="SubmittedAnswers">
          <h2 className="resultsHeader">Submitted Answers</h2>
          <span className="resultsPage">
            {questions.map((question, index) => (
              <p className="resultformat" key={question.question}>
                <strong>{question.question}</strong>
                <br></br>
                 {answers[index]}
                 <br></br>
              </p>
            ))}
            </span>
          <div>
            <br></br>
            <p>{gptReport}</p>
          <Button
                className="Return to Quiz"
                onClick={handleReturn}
              >Return to Quiz </Button>
              <Button
                className="getResponse"
                onClick={handleSubmitBasicAnswers}
              >Get My Results </Button>
              </div>
        </div>
      ) : (
        <div>
          <h1 className="BQH">Basic Questions</h1> 
      <h3 className = "Description"> 
      <p>Welcome to the Basic Questions! There are 18 total questions but you can answer as many or as few as you would like!</p>
      <p> The more questions you answer, the more accurate your results will be!</p>
      <p>You will be able to review your answers and go back and change any of them before you submit your results.</p> </h3>
          <div className="ProgressBarBQ">
            <div
              className="ActiveProgressBQ"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="QuestionHeader">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="QuestionContainer">
            <h3>{questions[currentQuestionIndex].question}</h3>
            {questions[currentQuestionIndex].type === "multiple choice" ? (
              <ul className="Ul-BQ" style={{ listStyleType: "none", paddingLeft: "0px"}}>
                {questions[currentQuestionIndex].answers?.map((answer) => (
                  <li key={answer}>
                    <input
                      type="radio"
                      id={answer}
                      name={`question${currentQuestionIndex}`}
                      value={answer}
                      checked={answers[currentQuestionIndex] === answer}
                      onChange={() => handleAnswerChange(answer)}
                    />
                    <label htmlFor={answer}>{answer}</label>
                  </li>
                ))}
              </ul>
            ) : (
              <textarea
                value={answers[currentQuestionIndex] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Please enter your answer here."
              />
            )}
          </div>
          <div className="ButtonContainer">
            <Button
              className="PrevButton"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button className="NextButton" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                className="BasicSubmitButton"
                onClick={handleResponseCheck}
              >Submit Basic Answers
              </Button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default BQPage;