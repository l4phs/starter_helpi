/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./DQPage.css";
import OpenAI from "openai";
//commiting all changes

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
  apiKey: string;
}

interface Question {
  id: number;
  question: string;
  answers: string[] | null;
  type: "short answer" | "multiple choice" | "checkbox";
}

function DQPage(props: Props): JSX.Element {
  console.log("API Key:", props.apiKey);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gptReport, setGptReport] = useState("");
 
  const [progress, setProgress] = useState(0);
  const [check, setCheck] = useState(false);

const detailedQuestions: Question [] = [

{
  id: 1,
  question: "What kind of work environment do you prefer? Describe your ideal workplace.",
  answers: null,
  type: "short answer"
}, 
{
  id: 2,
  question: "What values are most important to you in your career? (E.G., creativity, financial stability, work-life balance",
  answers: null,
  type: "short answer"
},
{
  id: 3,
  question: "How important is job stability to you?",
  answers: ["Not at all", "Slighly important", "Neutral about it", "Somewhat important", "Extremely important"],
  type: "multiple choice"
}, 
{
  id: 4,
  question: "What kind of roles or projects do you enjoy the most?",
  answers: ["Creative roles", "Analytical roles", "Leadership roles", "Hands-on roles", "Customer Service roles"],
  type: "multiple choice"
}, 
{
  id: 5,
  question: "How often do you rely on data and facts when making a decision?",
  answers: ["Never", "Some of the time", "Half of the time", "Most of the time", "Almost exclusively"],
  type: "multiple choice"
},
{
  id: 6,
  question: "How do you feel about presenting to groups?",
  answers: ["Extremely uncomfortable", "Mostly uncomfortable", "Neutral about it", "Mostly comfortable ", "Extremely comfortable"],
  type: "multiple choice"
},
{
  id: 7,
  question: "What skills do you enjoy using the most in your work?",
  answers: ["Communication and Writing", "Critical Thinking and Analysis", "Time management and organization", "Technical skills (i.e, coding or engineering", "Creative skills (i.e, design, art, music)"],
  type: "multiple choice"
},
{
  id: 8,
  question: "Describe a professional goal that you have set for yourself. What steps are you taking to achieve it?",
  answers: null,
  type: "short answer"
},
{
  id: 9,
  question: "What types of jobs or career fields interest you the most? Select all that apply",
  answers: ["Working with animals", "Medical and healthcare fields", "Mathematics and analytics", "Engineering and technology", "Creative and artistic fields", "Science and research", "Businesss and finance", "Education and teaching", "Writing and communication", "Law and legal professions", "Social services and advocacy", "Trades and skilled labor", "Hospitality and tourism", "Sales and customer service"],
  type: "checkbox"
},
{
  id: 10,
  question: "How open are you to trying new methods and approaches to your work?",
  answers: ["Not open at all", "Slightly open", "Neutral about it", "Mostly open ", "Extremely open"],
  type: "multiple choice"
},
{
  id: 11,
  question:
    "How would you rate your ability to learn new skills? (pick one)",
  answers: ["Excellent", "Good", "Average", "Below average", "Poor"],
  type: "multiple choice",
},
{
  id: 12,
  question: "List three activities you enjoy:",
  answers: null,
  type: "short answer",
},
{
  id: 13,
  question: "How do you prefer to spend your workday?",
  answers: [
    "Solving problems",
    "Meeting with colleagues",
    "Creating new ideas",
    "Following established procedures",
    "Completing designated tasks"
  ],
  type: "multiple choice",
},
];

const [answers, setAnswers] = useState<(string | null)[]>(
  Array(detailedQuestions.length).fill(null)
);
  const openai = new OpenAI({ apiKey: "key", dangerouslyAllowBrowser: true });

  const handleNext = () => {
    if (currentQuestionIndex < detailedQuestions.length - 1) {
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
    const totalQuestions = detailedQuestions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
    setProgress(percentage);
  };

  const handleSubmitDetailAnswers = async () => {
    const userContent = answers
      .map((answer, index) => `${detailedQuestions[index].question}: ${answer}`)
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
    <div className="Dbody">
      <div className="background"></div>
      <div className="DQH">Detailed Questions</div>
      <h3 className = "Description"> 
      <p>Welcome to the Detailed Questions! There are 13 total questions but you can answer as many or as few as you would like!</p>
      <p> The more questions you answer, the more accurate your results will be!</p>
      <p>You will be able to review your answers and go back and change any of them before you submit your results.</p> </h3>
      <div className="ProgressBarBQ">
        <div
          className="ActiveProgressBQ"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="QuestionHeader">
        <div>
          Question {currentQuestionIndex + 1} of {detailedQuestions.length}
        </div>
      </div>
      <div className="QuestionContainer">
        <h3>{detailedQuestions[currentQuestionIndex].question}</h3>
        {detailedQuestions[currentQuestionIndex].type === "multiple choice" ? (
          <ul className="Ul-DQ">
            {detailedQuestions[currentQuestionIndex].answers?.map((answer) => (
              <ul key={answer}>
                <input
                  type="radio"
                  id={answer}
                  name={`question${currentQuestionIndex}`}
                  value={answer}
                  checked={answers[currentQuestionIndex] === answer}
                  onChange={() => handleAnswerChange(answer)}
                />
                <label htmlFor={answer}>{answer}</label>
              </ul>
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
        {currentQuestionIndex < detailedQuestions.length - 1 ? (
          <Button className="NextButton" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button className="Submit-Button" onClick={handleSubmitDetailAnswers}>
            Submit Answers
          </Button>
        )}
      </div>
    </div>
  );
}

export default DQPage;
