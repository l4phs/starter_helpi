import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap')
</style>

//Lauren Pham
//Mantra Yang
//David Bui
//Neil Irungu

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
  const [currentView, setCurrentView] = useState<number>(0); // for managing the current page
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  const switchScreen = (view: string): void => {
    switch (view) {
      case "HomePage":
        setCurrentView(0);
        break;
      case "BasicQ":
        setCurrentView(1);
        break;
      case "DetailedQ":
        setCurrentView(2);
        break;
      default:
        setCurrentView(0); // Set a default view if none matches
    }
  };

  return (
    <React.Fragment>
      <div className="section1">
      <Button className='TaskBar'></Button>
      <Button className='TBBasicQ' onClick={() => switchScreen('BasicQ')}> Basic Questions</Button>
      <Button className='TBDetailedQ' onClick={() => switchScreen('DetailedQ')}> Detailed Questions</Button>
      <Button className='TBHomeP' onClick={() => switchScreen('HomePage')}>Home Page</Button>
      <Button className='SignInButton'> Sign In</Button>
        <div className='APIform'>
            <Form>  
              <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
              <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
            </Form>
          </div>
        <div className='text-container'>
        <div className='text'> What do I do?</div>
        </div>
      </div>

      {currentView === 0 && (
        <div className='section2'>
          <div className='text'>
            <p>
              Struggling to decide what to do with your life?<br></br> 
              Take a quiz!
            </p> 
          </div>
          <Button className='BasicQ' onClick={() => switchScreen('BasicQ')}> Basic Questions</Button>
          <Button className='DetailedQ' onClick={() => switchScreen('DetailedQ')}> Detailed Questions</Button>
        </div>
      )}

      {currentView === 2 && (
        <div className='section3'>
          <Button className='s3HomeP' onClick={() => switchScreen('HomePage')}>Home Page</Button>
          <Button className='s3BasicQ' onClick={() => switchScreen('BasicQ')}>Basic Questions</Button>
          <div className='DQH'>Detailed Questions Page</div>
          <div className='DQB'>
            <p>
            These questions give a more IN-DEPTH analysis of the kind of career you would be best suited to! 
              <br></br>
              Long, detailed answers are highly encouraged. Onwards!            </p>
          </div>
        </div>
      )}

      {currentView === 1 && (
        <div className='section3'> 
          <Button className='s3HomeP' onClick={() => switchScreen('HomePage')}>Home Page</Button>
          <Button className='s3DetailedQ' onClick={() => switchScreen('DetailedQ')}>Detailed Questions</Button>
          <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
          <div className='BQH'> Basic Questions Page</div> 
          <div className='BQB'>
            <p>
              These questions give a more BASIC analysis of the kind of career you would be best suited to! 
              <br></br>
              Short asnwers are highly encouraged. Onwards!
            </p>
          </div>
          <div className = 'BasicQuestions-List'>
            <span className="Question">Question 1</span>
            <span className="Question">Question 2</span>
            <span className="Question">Question 3</span>
            <span className="Question">Question 4</span>
            <span className="Question">Question 5</span>
            <span className="Question">Question 6</span>
            <span className="Question">Question 7</span>
            <span className="Question">Question 8</span>
            <span className="Question">Question 9</span>
            <span className="Question">Question 10</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;