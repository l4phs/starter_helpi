
// eslint-disable-next-line
import React, { useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap')
</style>
//redoing my commmit
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
  const[project, setProject] = useState<string[]>(["creative roles", "analytical roles", "leadership roles", "hands-on roles", "customer service roles"]) //options for detailed question #4
  const [detailedAnswers, setDetailedAnswers] = useState({});

   // Function to handle submission of detailed answers
   const handleSubmitDetailedAnswers = () => {
    // Make a POST request to the API endpoint with the detailed answers
    axios.post('API_ENDPOINT_URL', detailedAnswers)
      .then((response: { data: any; }) => {
        // Handle the API response, e.g., update UI with results
        console.log(response.data);
      })
      .catch((error: any) => {
        // Handle errors
        console.error('Error submitting detailed answers:', error);
      });
  };

  // Function to update detailed answers when input changes
  const handleDetailedAnswerChange = (questionNumber: any, answer: any) => {
    setDetailedAnswers(prevState => ({
      ...prevState,
      [questionNumber]: answer
    }));
  };

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  //function for the checkboxes for detailed question #4
  function updateProject (event: React.ChangeEvent<HTMLInputElement>){
    const proj = event.target.value;
    if (project.includes(proj)){
      setProject(project.filter((e) => e !== proj));
    } else {
      setProject([...project, proj]);
    }

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
      <div className='TaskBarRectangle'>
        
      </div>
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
          <h4 className='Boxie'>
          <br></br>
          Discover your ideal career path with our basic Career Path Quiz! 
          <br></br>
          <br></br>
          Tailored for those beginning their career journey, this quiz helps you explore your interests, strengths, and preferences. 
          <br></br>
          <br></br>
          Quick and easy to understand and results are immediate following the completion of the quiz.
          <br></br>
          <br></br>
          Uncover potential career paths aligned with your aspirations, whether you're a recent graduate or considering a change. 
          <br></br>
          <br></br>
          Start your exploration today and take the first step toward a fulfilling career!
          <br></br>
          <br></br>
          An example of a question you may see:
          <br></br>
          <br></br>
          Question 1:
          <br></br>
          <br></br>
          What location would you prefer to live in?
          <br></br>
          <br></br>
          - Suburban -Urban
          <br></br>
          <br></br>
          - City         -Coastal/Beach
          <br></br>
          </h4>
          <Button className='BasicQ' onClick={() => switchScreen('BasicQ')}> Basic Questions</Button>
          <h4 className='Boxie2'>
          <br></br>
          Take your career exploration to new heights with our Advanced Career Path Quiz! 
          <br></br>
          <br></br>
          Designed for those seeking in-depth insights, this quiz assesses your skills, values, and goals. 
          <br></br>
          <br></br>
          Navigate through complex scenarios and uncover opportunities aligned with your ambitions. 
          <br></br>
          <br></br>
          Whether you're a seasoned professional or a student planning your future, empower yourself to make informed decisions and pursue your dream career. 
          <br></br>
          <br></br>
          Start navigating your future today!
          <br></br>
          <br></br>
          An example of a question you may see:
          <br></br>
          <br></br>

          </h4>
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
          <div>
            <br></br>
            <div className='ProgressBar'>
            <div className='ActiveProgress'></div>
              <p></p>
            </div>
            <br></br>
            <div className='DetailedQuestions-List'>
              <div className='Det-Question'> Question 1
              <div className='body' > What kind of work environment do you prefer? Describe your ideal workplace.</div>
              <input type='text'  className = 'textboxclass' onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}></input>
              </div>
              <div className='Det-Question'> Question 2
              <div className='body' > What values are most important to you in your career? (e.g., creativity, financial stability, work-life balance)</div>
              <input type='text' className = 'textboxclass' onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}></input>
              </div>
              <div className='Det-Question'> Question 3
              <div className='body' > Is job stability important to you?</div>
              <input type='text' className = 'textboxclass' onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}></input>
              </div>
              <div className='Det-Question'> Question 4
              <div className='body' > What kind of roles or projects do you most enjoy?</div> 
              <div className='options'>
              <Form.Check
              inline
              type='checkbox'
              id='project-check-creative'
              label = 'Creative Projects'
              name = 'project'
              value= 'creative projects'
              checked = {project.includes ("creative projects")}
              //onChange={updateProject} 
              onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
              />
              <Form.Check
              inline
              type='checkbox'
              id='project-check-creative'
              label = 'Creative Projects'
              name = 'project'
              value= 'creative projects'
              checked = {project.includes ("creative projects")}
              //onChange={updateProject} 
              onChange={(e) => handleDetailedAnswerChange(1, e.target.value)}
              />
              </div>
              </div>
              <div className='Det-Question'> Question 5
              <div className='body' > How often do you rely on data and facts when making decisions?</div>
              </div>
              <div className='Det-Question'> Question 6
              <div className='body' > How do you feel about public speaking and/or presenting ideas to groups?</div>
              </div>
              <div className='Det-Question'> Question 7
              <div className='body' > What skills do you enjoy most in your work? Select all that apply. </div>
              <input type='text' className = 'textboxclass'></input>
              </div>
              <div className='Det-Question'> Question 8
              <div className='body' > Describe a professional goal you've set for yourself and the plans you are currently taking to achieve it. </div>
              <input type='text' className = 'textboxclass'></input>
              </div>
              <div className='Det-Question'> Question 9
              <div className='body' > What career fields intrest you the most? Select all that apply. </div>
              <input type='text' className = 'textboxclass'></input>
              </div>
              <div className='Det-Question'> Question 10
              <div className='body' > How open are you to trying new methods or approaches to your work?</div>
              <input type='text' className = 'textboxclass'></input>

              <button className="Submit-Button" onClick={handleSubmitDetailedAnswers}>Submit Detailed Answers</button>
              </div>


            </div>
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
          <br></br>
          <br></br>
            <div className='ProgressBar'>
            <div className='ActiveProgress'></div>
              <p></p>
            </div>
            <br></br>
          <div className = 'BasicQuestions-List'>
            <span className="Question">Question 1
            <div className='body' > List three activities you enjoy doing?</div>
            </span>
            <span className="Question">Question 2
            <div className='body' > What is your ideal shift time?</div>
            </span>
            <span className="Question">Question 3
            <div className='body' > Would you enjoy traveling for work?</div>
            </span>
            <span className="Question">Question 4
            <div className='body' > What subject are you the best at?</div>
            </span>
            <span className="Question">Question 5
            <div className='body' > I work well in fast paced environments</div>
            </span>
            <span className="Question">Question 6
            <div className='body' > Would you prefer to be relatively sedentary or active at work?</div>
            </span>
            <span className="Question">Question 7
            <div className='body' > Would you prefer working from home, in an office / on site, or hybrid?</div>
            </span>
            <span className="Question">Question 8
            <div className='body' > Do you prefer to do work individually, in a small group (2-4 people), or a team (more than 4 people)?</div>
            </span>
            <span className="Question">Question 9
            <div className='body' > What kind of learner are you?</div>
            </span>
            <span className="Question">Question 10
            <div className='body' > Do you prefer consistent work hours over a flexible schedule?</div>
            <button className="Submit-Button" onClick={handleSubmitDetailedAnswers}>Submit Basic Answers</button>
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;