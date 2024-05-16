/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./DQPage.css";
import OpenAI from "openai";
//commiting all changes

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
  apiKey: string;
  setGptReport: (report: string) => void; // Added prop to set GPT report
}

interface Question {
  id: number;
  question: string;
  answers: string[] | null;
  type: "short answer" | "multiple choice" | "checkbox";
}

function DQPage(props: Props): JSX.Element {
  console.log("API Key:", props.apiKey);

  const detailedQuestions: Question[] = [
    {
      id: 1,
      question:
        "What kind of work environment do you prefer? Describe your ideal workplace.",
      answers: null,
      type: "short answer",
    },
    {
      id: 2,
      question:
        "What values are most important to you in your career? (E.G., creativity, financial stability, work-life balance)",
      answers: null,
      type: "short answer",
    },
    {
      id: 3,
      question: "How important is job stability to you?",
      answers: [
        "Not at all",
        "Slighly important",
        "Neutral about it",
        "Somewhat important",
        "Extremely important",
      ],
      type: "multiple choice",
    },
    {
      id: 4,
      question: "What kind of roles or projects do you enjoy the most?",
      answers: [
        "Creative roles",
        "Analytical roles",
        "Leadership roles",
        "Hands-on roles",
        "Customer Service roles",
      ],
      type: "multiple choice",
    },
    {
      id: 5,
      question:
        "How often do you rely on data and facts when making a decision?",
      answers: [
        "Never",
        "Some of the time",
        "Half of the time",
        "Most of the time",
        "Almost exclusively",
      ],
      type: "multiple choice",
    },
    {
      id: 6,
      question: "How do you feel about presenting to groups?",
      answers: [
        "Extremely uncomfortable",
        "Mostly uncomfortable",
        "Neutral about it",
        "Mostly comfortable ",
        "Extremely comfortable",
      ],
      type: "multiple choice",
    },
    {
      id: 7,
      question: "What skills do you enjoy using the most in your work?",
      answers: [
        "Communication and Writing",
        "Critical Thinking and Analysis",
        "Time management and organization",
        "Technical skills (i.e, coding or engineering",
        "Creative skills (i.e, design, art, music)",
      ],
      type: "multiple choice",
    },
    {
      id: 8,
      question:
        "Describe a professional goal that you have set for yourself. What steps are you taking to achieve it?",
      answers: null,
      type: "short answer",
    },
    {
      id: 9,
      question:
        "What types of jobs or career fields interest you the most? Select all that apply",
      answers: [
        "Working with animals",
        "Medical and healthcare fields",
        "Mathematics and analytics",
        "Engineering and technology",
        "Creative and artistic fields",
        "Science and research",
        "Businesss and finance",
        "Education and teaching",
        "Writing and communication",
        "Law and legal professions",
        "Social services and advocacy",
        "Trades and skilled labor",
        "Hospitality and tourism",
        "Sales and customer service",
      ],
      type: "checkbox",
    },
    {
      id: 10,
      question:
        "How open are you to trying new methods and approaches to your work?",
      answers: [
        "Not open at all",
        "Slightly open",
        "Neutral about it",
        "Mostly open ",
        "Extremely open",
      ],
      type: "multiple choice",
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
        "Completing designated tasks",
      ],
      type: "multiple choice",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gptReport, setGptReport] = useState("");

  const [progress, setProgress] = useState(0);
  const [check, setCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track if answers have been submitted

  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(detailedQuestions.length).fill(null)
  );
  const openai = new OpenAI({
    apiKey: props.apiKey,
    dangerouslyAllowBrowser: true,
  });

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

  const handleReturn = () => {
    setSubmitted(false);
  };

  const handleResponseCheck = () => {
    setSubmitted(true);
  };

  const handleSubmitDetailAnswers = async () => {
    const userContent = answers
      .map((answer, index) => `${detailedQuestions[index].question}: ${answer}`)
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
    <div className="Dbody">
      {submitted ? (
        // Display submitted answers if submitted is true
        <div>
          <div className="resultBackgroundDetailed"></div>
          <div className="SubmittedAnswers">
            <h2 className="resultsHeader">Your Responses</h2>
            <span className="Description">
              <p>
                There are buttons at the bottom to change your answers OR move
                on to view your personally curated results!{" "}
              </p>
            </span>
            <div className="resultsContainer">
              <span className="resultsPageDetailed">
                {detailedQuestions.map((question, index) => (
                  <p className="resultformatDetailed" key={question.question}>
                    <strong>{question.question}</strong>
                    <br></br>
                    {answers[index]}
                    <br></br>
                  </p>
                ))}
              </span>
            </div>
            <div>
              <Button className="returnButtonDetailed" onClick={handleReturn}>
                Return to Quiz{" "}
              </Button>
              <Button
                className="resultSubmitButtonDetailed"
                onClick={handleSubmitDetailAnswers}
              >
                Collect My Brew{" "}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="background"></div>
          <div className="DQH">Detailed Questions</div>
          <h3 className="Description">
            <p>
              Welcome to the Detailed Questions! There are 13 total questions
              but you can answer as many or as few as you would like!
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
            Question {currentQuestionIndex + 1} of {detailedQuestions.length}
          </div>
          <div className="detailedQuestionContainer">
            <h3>{detailedQuestions[currentQuestionIndex].question}</h3>
            {detailedQuestions[currentQuestionIndex].type ===
            "multiple choice" ? (
              <ul
                className="Ul-BQ"
                style={{ listStyleType: "none", paddingLeft: "0px" }}
              >
                {detailedQuestions[currentQuestionIndex].answers?.map(
                  (answer) => (
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
                  )
                )}
              </ul>
            ) : (
              <textarea
                value={answers[currentQuestionIndex] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Please enter your answer here."
              />
            )}
          </div>
          <div className="buttonContainer">
            <Button
              className="detPrevButton"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < detailedQuestions.length - 1 ? (
              <Button className="detNextButton" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button className="detSubmitButton" onClick={handleResponseCheck}>
                Submit Your Answers
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DQPage;
