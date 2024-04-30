import React, { useState } from "react";
import { Button } from "react-bootstrap";

import axios from "axios";
import "./BQPage.css"

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

function BQPage({ setPage }: Props): JSX.Element {
  const [detailedAnswers] = useState({});

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

  return (
    <div className="Bbody">
      <h1 className="BQH"> Basic Questions Page</h1>
      <p className="BQB">
        These questions give a more BASIC analysis of the kind of career you
        would be best suited to!
        <br></br>
        Short asnwers are highly encouraged. Onwards!
      </p>
      <br></br>
      <ul className="BasicQuestions-List">
        <li>
          Question 1 <br></br>
          List three activities you enjoy doing?
        </li>
        <li>
          Question 2<br></br>What is your ideal shift time?
        </li>
        <li>
          Question 3<br></br>Would you enjoy traveling for work?
        </li>
        <li>Question 4 What subject are you the best at?</li>
        <li>
          Question 5<br></br>I work well in fast paced environments
        </li>
        <li>
          Question 6<br></br> Would you prefer to be relatively sedentary or
          active at work?
        </li>
        <li>
          Question 7<br></br> Would you prefer working from home, in an office /
          on site, or hybrid?
        </li>
        <li>
          Question 8<br></br> Do you prefer to do work inbridually, in a small
          group (2-4 people), or a team (more than 4 people)?
        </li>
        <li>
          Question 9<br></br> What kind of learner are you?
        </li>
        <li>
          Question 10
          <br></br> Do you prefer consistent work hours over a flexible
          schedule?
        </li>
      </ul>
      <Button
            className="BQ-SubmitButton"
            onClick={handleSubmitDetailedAnswers}
          >
            Submit Basic Answers
          </Button>
    </div>
  );
}

export default BQPage;
