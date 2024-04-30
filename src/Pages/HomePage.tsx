import { Button, Form } from "react-bootstrap";
import React from "react";
import "./HomePage.css";

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

const HomePage: React.FC<Props> = ({ setPage }) => {
  return (
    <div className="Hbody">
      <div className="text">
        <p>
          Struggling to decide what to do with your life?<br></br>
          Take a career path quiz!
        </p>
      </div>
      <div className="BQDiscriptions">
        <h1>Basic Quiz!</h1>
          Discover your ideal career path with our basic career path quiz!
          <br></br>
          Tailored for those beginning their career journey, this quiz helps you
          explore your interests, strengths, and preferences. 
          <br></br>
          Quick and easy to
          understand and results are immediate following the completion of the
          quiz.
          <br></br>
          <br></br>
          Start your exploration today and take the first step toward a fulfilling career!
      <br></br>
        An example of a question you may see:
        <br></br>
          <br></br>
          What location would you prefer to live in?
          <br></br>
          <br></br>
          •Suburban •Urban •City •Costal Town
      </div>
      <Button className="BQButton" onClick={() => setPage("BQPage")}>
        {" "}
        Take Basic Quiz Here
      </Button>
      <div className="DQDiscriptions">
        <h1>Detailed Quiz!</h1>
        Take your career exploration to new heights with our Advanced Career
        Path Quiz! 
        <br></br>
        Designed for those seeking in-depth insights, this quiz
        assesses your skills, values, and goals.
        <br></br>
        Whether you're a seasoned professional or a student planning your
        future, empower yourself to make informed decisions and pursue your
        dream career.
        <br></br>
        <br></br>
        Start navigating your future today!
        <br></br>
        <br></br>
        An example of a question you may see:
        <br></br>
        <br></br>
        What kind of work environment do you prefer?
        <br></br>
        <div>
        <Form.Group>
        <Form.Control
        as="textarea"
        rows={3} />
        </Form.Group>
    </div>
        <br></br>
      </div>
      <Button className="DQButton" onClick={() => setPage("DQPage")}>
        {" "}
        Take Detailed Quiz Here
      </Button>
    </div>
  );
};

export default HomePage;
