// eslint-disable-next-line
import React, { useRef, useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import HomePage from "./Pages/HomePage";
import BQPage from "./Pages/BQPage";
import DQPage from "./Pages/DQPage";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap')
</style>;

//Lauren Pham
//Mantra Yang
//David Bui
//Neil Irungu

            /*
            This is previously used questions bfore 4/25 merge
            <span className="Question">Would you prefer working from home, in an office / on site, or hybrid? (pick one)</span>
            <span className="Question">What salary would you not feel comfortable earning less than?</span>
            <span className="Question">Do you prefer to do work individually, in a small group (2-4 people), or a team (more than 4 people)?</span>
            <span className="Question">How would you describe your ideal work environment in one word?</span>
            <span className="Question">How can you describe yourself in one word?</span>
            <span className="Question">What are you the best at?</span>
            <span className="Question">How would you rate your ability to learn new skills? (pick one)</span>
            <span className="Question">I work well in fast paced environments.</span>
            <span className="Question">What is most important to you in a job?</span>
            <span className="Question">Would you enjoy traveling for work?</span>
            */

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App(): JSX.Element {
  const [key, setKey] = useState<string>(keyData); //for api key input
  //setting states for each page
  // const[project, setProject] = useState<string[]>(["creative roles", "analytical roles", "leadership roles", "hands-on roles", "customer service roles"]) //options for detailed question #4

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  const [page, setPage] = useState("HomePage");


  return (
    <React.Fragment>
      <div>
        <ul className="TB-ul">
          <div className="TaskBar">
            <li className="TB-li"> Sign In </li>
            <li className="TB-li" onClick={() => setPage("DQPage")}>
              {" "}
              Detailed Questions{" "}
            </li>
            <li className="TB-li" onClick={() => setPage("BQPage")}>
              {" "}
              Basic Questions{" "}
            </li>
            <li className="TB-li" onClick={() => setPage("HomePage")}>
              {" "}
              Home{" "}
            </li>
            <li className="APIform">
              <Form>
                <Form.Control
                  type="password"
                  placeholder="Insert API Key Here"
                  onChange={changeKey}
                />
              </Form>
            </li>
            <li className="SubmitButton" onClick={handleSubmit}>
              Submit
            </li>
          </div>
          <li className="TaskbarHeader" onClick={() => setPage("HomePage")}>
            What Do I Do?
          </li>
        </ul>
      </div>

      {page === "HomePage" && <HomePage setPage={setPage} />}

      {page === "BQPage" && <BQPage setPage={setPage} />}

      {page === "DQPage" && <DQPage setPage={setPage} />}
    </React.Fragment>
  );
}

export default App;