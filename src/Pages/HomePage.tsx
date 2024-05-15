/* eslint-disable jsx-a11y/alt-text */
import { Button, Form } from "react-bootstrap";
import React, { useEffect } from "react";
import "./HomePage.css";

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

function HomePage({ setPage }: Props): JSX.Element {
  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;

      const coffee1 = document.getElementById("coffee1");
      const coffee2 = document.getElementById("coffee2");
      const coffee3 = document.getElementById("coffee3");

      if (coffee1) coffee1.style.transform = `translateY(-${yPos * 0.1}px)`;
      if (coffee2) coffee2.style.transform = `translateY(-${yPos * 0.3}px)`;
      if (coffee3) coffee3.style.transform = `translateY(-${yPos * 0.8}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="pageTop">
        <h2 className="styledText">Shoot for the moon!!!</h2>
      </div>

      <div className="pageBody">
        {/* Buttons to navigate to Basic and Detailed question pages */}
        <div className="parallax-scrolling">
          <div id="coffee1" className="parallax-coffee-layer"></div>
          <div id="coffee2" className="parallax-coffee-layer"></div>
          <div id="coffee3" className="parallax-coffee-layer">
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
          This quiz helps you lightly
          explore your interests, strengths, and preferences. 
          <br></br>
          Start your exploration today and take the first step toward a fulfilling career!
      <br></br>
      <br></br>
        <b>An example of a question you may see:</b>
          <br></br>
          What location would you prefer to live in?
          <br></br>
          <input type="radio" 
          value={"Suburban"}
          name="Suburban"
            />
            Suburban
            <input type="radio" 
          value={"Suburban"}
          name="Suburban"
            />
            Urban
          <br></br>
          <input type="radio" 
          value={"Suburban"}
          name="Suburban"
            />
          City 
          <input type="radio" 
          value={"Suburban"}
          name="Suburban"
            />
          Coastal Town
      </div>

              <div className="DQDiscriptions">
                <h1>Detailed Quiz!</h1>
                Take your career exploration to new heights with our Advanced
                Career Path Quiz! 
                <br></br>
                Designed for those seeking in-depth insights, this quiz
        assesses your skills, values, and goals.
        <br></br>
                Start navigating your future today!
              
                <br></br>
                <br></br>
                <b>An example of a question you may see:</b>
        <br></br>
        What kind of work environment do you prefer?
        <br></br>
        <div>
        <Form.Group>
        <Form.Control
        as="textarea"
        rows={2} />
        </Form.Group>
    </div>
        <br></br>
      </div>
            </div>
          </div>
          <div className="container"></div>
        </div>
      </div>
      <Button className="BQButton" onClick={() => setPage("BQPage")}>
        {" "}
        Basic Questions
      </Button>
      <Button className="DQButton" onClick={() => setPage("DQPage")}>
        {" "}
        Detailed Questions
      </Button>
    </>
  );
}

export default HomePage;
