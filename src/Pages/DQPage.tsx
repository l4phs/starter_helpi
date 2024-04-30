import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./DQPage.css";

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

function DQPage({ setPage }: Props): JSX.Element {
  const [QuestionView, setQuestionView] = useState<number>(1); // for managing the current page
  const [project, setProject] = useState<string[]>([
    "creative roles",
    "analytical roles",
    "leadership roles",
    "hands-on roles",
    "customer service roles",
  ]);
  const [detailedAnswers, setDetailedAnswers] = useState({});

  const handleSubmitDetailedAnswers = () => {
    axios
      .post("API_ENDPOINT_URL", detailedAnswers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting detailed answers:", error);
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

  function updateProject(event: React.ChangeEvent<HTMLInputElement>) {
    const proj = event.target.value;
    if (project.includes(proj)) {
      setProject(project.filter((e) => e !== proj));
    } else {
      setProject([...project, proj]);
    }
  }

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
    <div className="Dbody">
      <div className="DQH">Detailed Questions Page</div>
      <div className="DQB">
        <p>
          These questions give a more IN-DEPTH analysis of the kind of career
          you would be best suited to!
          <br></br>
          Long, detailed answers are highly encouraged. Onwards!
        </p>
      </div>
      {/* Detailed questions and input fields */}
      {QuestionView === 1 && (
        <div className="Det-Question">
          Question 1
          <div className="det-body">
            What kind of work environment do you prefer? Describe your ideal
            workplace.
          </div>
          <input
            type="text"
            className="textboxclass"
            onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
          />
          <Button className='NextButton' onClick={() => QuestionController('next')}> next </Button>
        </div>
      )}
      {QuestionView === 2 && (
      <div className="Det-Question">
        Question 2
        <div className="det-body">
          What values are most important to you in your career? (e.g.,
          creativity, financial stability, work-life balance)
        </div>
        <input
          type="text"
          className="textboxclass"
          onChange={(e) => handleDetailedAnswerChange(2, e.target.value)}
        />
        <Button className='NextButton' onClick={() => QuestionController('next')}> next </Button>
      </div>
      )}
      <div className="Det-Question">
        Question 3
        <div className="det-body">Is job stability important to you?</div>
        <input
          type="text"
          className="textboxclass"
          onChange={(e) => handleDetailedAnswerChange(3, e.target.value)}
        />
      </div>
      <div className="Det-Question">
        Question 4
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
      </div>
      <div className="Det-Question">
        Question 5
        <div className="det-body">
          How often do you rely on data and facts when making decisions?
        </div>
      </div>
      <div className="Det-Question">
        Question 6
        <div className="det-body">
          How do you feel about public speaking and/or presenting ideas to
          groups?
        </div>
      </div>
      <div className="Det-Question">
        Question 7
        <div className="det-body">
          What skills do you enjoy most in your work? Select all that apply.
        </div>
        <input type="text" className="textboxclass" />
      </div>
      <div className="Det-Question">
        Question 8
        <div className="det-body">
          Describe a professional goal you've set for yourself and the plans you
          are currently taking to achieve it.
        </div>
        <input type="text" className="textboxclass" />
      </div>
      <div className="Det-Question">
        Question 9
        <div className="det-body">
          What career fields intrest you the most? Select all that apply.
        </div>
        <input type="text" className="textboxclass" />
      </div>
      <div className="Det-Question">
        Question 10
        <div className="det-body">
          How open are you to trying new methods or approaches to your work?
        </div>
        <input type="text" className="textboxclass" />
      </div>
      <Button className="Submit-Button" onClick={handleSubmitDetailedAnswers}>
        Submit Detailed Answers
      </Button>
    </div>
  );
}

export default DQPage;
