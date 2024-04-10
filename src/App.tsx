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

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <body>
      <div className = "section1">
      <Button className='SignInButton'> Sign In</Button>
      <div className='APIform'>
            <Form>  
              <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control> 
              <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
            </Form>
          </div>
        <div className='text'> What do I do?</div>
      </div>
        <div className='section2'>
            <div className='text'>
              <p>
                Struggling to decide what to do with your life?<br></br> 
                Take a quiz!
              </p> 
            </div>
            <button className='BasicQ'>  Basic Questions</button>
            <button className='AdvancedQ'>Advanced Questions</button>
          </div>
          <div className='section3'>
            <div className='text'> Detailed Questions Page</div>
            <div className='body'>
              <p>
              These questions give a more indepth analysis of the kind of career you would be best suited to! Long, detailed answers are highly encouraged. Onwards!
                </p>
            </div>
        </div>
    </body>
  );
  
}

export default App;

