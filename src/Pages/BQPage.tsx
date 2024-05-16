/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-template-curly-in-string */
//import { Button } from "react-bootstrap";
import { useState } from "react";
import "./BQPage.css";
import "./LoadingPage";
import OpenAI from "openai";
import { Button } from "react-bootstrap";

//Code written with the assistance of Gemini AI.

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
  apiKey: string; // Add apiKey as a prop
  setGptReport: (report: string) => void; // Added prop to set GPT report
}

interface Question {
  question: string;
  answers: string[] | null;
  type: "short answer" | "multiple choice";
}

function BQPage(props: Props): JSX.Element {
  console.log("API Key:", props.apiKey);

  const questions: Question[] = [
    //18 questions total
    {
      question:
        "Would you prefer working from home, in an office / on site, or hybrid? (pick one)",
      answers: ["Working from home", "In an office / on site", "Hybrid"],
      type: "multiple choice",
    },
    {
      question:
        "What salary would you not feel comfortable earning less than? (pick one)",
      answers: ["50K", "70K", "100K", "160K"],
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
      question: "I work well in fast paced environments",
      answers: ["True", "False"],
      type: "multiple choice",
    },
    {
      question: "Would you enjoy traveling for work?",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question: "What is the maximum amount of hours you would prefer to work?",
      answers: ["30 Hrs", "40 Hrs", "60 Hrs", "As many hours as needed"],
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
      question: "I prefer jobs that require a lot of attention to detail",
      answers: ["True", "False"],
      type: "multiple choice",
    },
    {
      question: "Do you enjoy working in high-pressure situations?",
      answers: ["Yes", "No"],
      type: "multiple choice",
    },
    {
      question: "I prefer consistent work hours over a flexible schedule.",
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
  };

  const handleResponseCheck = () => {
    setSubmitted(true);
  };

  const handleSubmitBasicAnswers = async () => {
    const userContent = answers
      .map((answer, index) => `${questions[index].question}: ${answer}`)
      .join("\n");

    try {
      props.setPage("LoadingPage");
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a career genie helping lead to the greatest career choices while implementing your love for coffee. Give a detailed paragraph analysis of the answers given and then the top 3 job choices formatted as follows: job name,pay rate, description, and why matched. Have a sweet closer about coffee. If all the answers are null use the top 3 most popular jobs.\nformat it like this\n\n**Career Report:** Based on your answers, you seem to prefer a work environment that is structured yet dynamic, set on-site with a preference for consistent working hours, and oriented for active collaboration in small groups. The ideal pace is brisk but not high-pressure, and a role that requires attention to detail is a good fit. You seek a position with a minimum salary of $100K, no travel, and the opportunity to work in casual attire. Considering these attributes, here are the top career choices for you:\n\n**JOB NAME #1: Marketing Manager**\n**DESCRIPTION:** Oversee promotional activities, manage marketing campaigns, and work closely with small teams to enhance brand awareness.\n**WHY MATCHED:** This position involves detailed planning and execution, aligns well with working in small groups, and offers the possibility of on-site work during regular business hours in a dynamic environment.\n**PAY RATE:** $100K-$130K annually\n\n**JOB NAME #2: UX/UI Designer**\n**DESCRIPTION:** Design and enhance the user experience and interface for digital products, ensuring that they are accessible and appealing.\n**WHY MATCHED:** Requires exceptional attention to detail and periodic updates to match evolving user needs, fitting well with your preference for engaging work that allows for creativity in a small group setting.\n**PAY RATE:** $85K-$120K annually\n\n**JOB NAME #3: Project Manager**\n**DESCRIPTION:** Coordinate and oversee projects from initiation to completion, ensuring they adhere to timelines, scope, and budget, primarily collaborating with small teams.\n**WHY MATCHED:** Emphasizes structured work hours and involves active participation in managing tasks and team activities, matching your desire for an energetic yet formal work rhythm.\n**PAY RATE:** $90K-$115K annually\n\n**Closer:**Regardless of the path you choose, may each workday be as rich and invigorating as a perfectly brewed cup of coffee, refreshing and rewarding in every way. Cheers to finding a career that feels just right!",
          },
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
      props.setGptReport(careerReport); // Set GPT report in parent state

      // Update state to indicate answers have been submitted
      setCheck(true);
    } catch (error) {
      console.error("Error generating career insights:", error);
      // Handle error or display error message
    } finally {
      props.setPage("ResultPage");
    }
  };

  return (
    <div className="BQPage">
      {submitted ? (
        // Display submitted answers if submitted is true
        <div>
          <div className="resultBackground"></div>
          <div className="SubmittedAnswers">
            <h2 className="resultsHeader">Your Responses</h2>
            <span className="Description">
              <p>
                There are buttons at the bottom to change your answers OR move
                on to view your personally curated results!{" "}
              </p>
            </span>
            <div className="resultsContianer">
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
              <Button className="returnButton" onClick={handleReturn}>
                Return to Quiz{" "}
              </Button>
              <Button
                className="resultSubmitButton"
                onClick={handleSubmitBasicAnswers}
              >
                Collect My Brew{" "}
              </Button>
            </div>
            
          </div>
        </div>
      ) : (
        <div>
          <div className="Background"></div>
          <h1 className="BQH">Basic Questions</h1>
          <h3 className="Description">
            <p>
              Welcome to the Basic Questions! There are 18 total questions but
              you can answer as many or as few as you would like!
            </p>
            <p>
              {" "}
              The more questions you answer, the more accurate your results will
              be!
            </p>
            <p>
              You will be able to review your answers and go back and change any
              of them before you submit your results.
            </p>{" "}
          </h3>
          <h1 className="BQH">Basic Questions</h1>
          <h3 className="Description">
            <p>
              Welcome to the Basic Questions! There are 18 total questions but
              you can answer as many or as few as you would like!
            </p>
            <p>
              {" "}
              The more questions you answer, the more accurate your results will
              be!
            </p>
            <p>
              You will be able to review your answers and go back and change any
              of them before you submit your results.
            </p>{" "}
          </h3>
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
              <ul className="Ul-BQ" style={{ paddingLeft: "0px" }}>
                {questions[currentQuestionIndex].answers?.map((answer) => (
                  <section className="radio-list">
                    <div className="radio-list">
                      <li className="radio-item" key={answer}>
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
                    </div>
                  </section>
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
              >
                Submit Your Answers
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BQPage;
