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
  const [isHome, setHome] = useState<boolean>(true);
  const [isBasic, setBasic] = useState<boolean>(false);
  const [isAdvance, setAdvance] = useState<boolean>(false);
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  function updateHome(): void {
    setHome(!isHome);

    if(isHome){
      if(isBasic === true){
        setBasic(false);
      }
      if(isAdvance === true){
        setAdvance(false);
      }
    }
  }
  function updateBasic(): void {
    setBasic(!isBasic);

    if(isBasic){
      if(isHome=== true){
        setHome(false);
      }
      if(isAdvance === true){
        setAdvance(false);
      }
    }
  }
  function updateAdvance(): void {
    setAdvance(!isAdvance);

    if(isAdvance){
      if(isHome === true){
        setHome(false);
      }
      if(isBasic === true){
        setBasic(false);
      }
    }
  }

  return (
    <body>
      <div className = "section1">
      <Button className='allTabs' id="Home-Page"
            onClick={updateHome}> Home Page </Button>
            <button className='allTabs'
            id="Basic-mode"
            onClick={updateBasic}>  Basic Questions</button>
            <button className='allTabs'
            id="Advanced-mode"
            onClick={updateAdvance}>Advanced Questions</button>
      <Button className='SignInButton'> Sign In</Button>
      <div className='APIform'>
            <Form>  
              <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control> 
              <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
            </Form>
          </div>
        <div className='text'> What do I do?</div>

      </div>
      
      { //if booleans are true then display the page content... still needs to be fixed
      isHome && (
        <div className='section2'>
            <div className='text'>
              <p>
                Struggling to decide what to do with your life?<br></br> 
                Take a quiz!
              </p> 
            </div>
            <button className='BasicQ'
            id="Basic-mode"
            onClick={updateBasic}>  Basic Questions</button>
            <button className='AdvancedQ'
            id="Advanced-mode"
            onClick={updateAdvance}>Advanced Questions</button>
          </div> )}
        
      {isAdvance && (<div className='section3'> <div className='text'> Detailed Questions Page</div> </div>)}
      {isBasic && (<div className='section3'> <div className='text'> Basic Questions Page</div> </div>)}
  </body>);

  
  
}

export default App;

