import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./DQPage.css";
import OpenAI from "openai";

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

interface Question {
  id: number;
  question: string;
  answers:string[] | null;
  type: "short answer" | "multiple choice" | "checkbox";
}

function DQPage({ setPage }: Props): JSX.Element {


const detailedQuestions: Question [] = [

{
  id: 1,
  question: "What kind of work environment do you prefer? Describe your ideal workplace.",
  answers: null,
  type: "short answer"
}, 
{
  id: 2,
  question: "What values are most important to you in your career? (E.G., creativity, financial stability, work-life balance",
  answers: null,
  type: "short answer"
},
{
  id: 3,
  question: "How important is job stability to you?",
  answers: ["1. Not at all", "2. Slighly important", "3. Neutral about it", "4. Somewhat important", "5. Extremely important"],
  type: "multiple choice"
}, 
{
  id: 4,
  question: "What kind of roles or projects do you enjoy the most?",
  answers: ["Creative roles", "Analytical roles", "Leadership roles", "Hands-on roles", "Customer Service roles"],
  type: "multiple choice"
}, 
{
  id: 5,
  question: "How often do you rely on data and facts when making a decision?",
  answers: ["1. Never", "2. Some of the time", "3. Half of the time", "4. Most of the time", "5. Almost exclusively"],
  type: "multiple choice"
},
{
  id: 6,
  question: "How do you feel about presenting to groups?",
  answers: ["1. Extremely uncomfortable", "2. Mostly uncomfortable", "3. Neutral about it", "4. Mostly comfortable ", "Extremely comfortable"],
  type: "multiple choice"
},
{
  id: 7,
  question: "What skills do you enjoy using the most in your work?",
  answers: ["Communication and Writing", "Critical Thinking and Analysis", "Time management and organization", "Technical skills (i.e, coding or engineering", "Creative skills (i.e, design, art, music)"],
  type: "multiple choice"
},
{
  id: 8,
  question: "Describe a professional goal that you have set for yourself. What steps are you taking to achieve it?",
  answers: null,
  type: "short answer"
},
{
  id: 9,
  question: "What types of jobs or career fields interest you the most? Select all that apply",
  answers: ["Working with animals", "Medical and healthcare fields", "Mathematics and analytics", "Engineering and technology", "Creative and artistic fields", "Science and research", "Businesss and finance", "Education and teaching", "Writing and communication", "Law and legal professions", "Social services and advocacy", "Trades and skilled labor", "Hospitality and tourism", "Sales and customer service"],
  type: "checkbox"
},
{
  id: 10,
  question: "How open are you to trying new methods and approaches to your work?",
  answers: ["1. Not open at all", "2. Slightly open", "3. Neutral about it", "4. Mostly open ", "Extremely open"],
  type: "multiple choice"
},

]

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>(Array(detailedQuestions.length).fill(null));
    const [progress, setProgress] = useState(0);
    const [, setSubmitted] = useState(false); // State to track if answers have been submitted

    const openai = new OpenAI({ apiKey: 'key', dangerouslyAllowBrowser: true });

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
  
      const answeredCount = updatedAnswers.filter((answer) => answer !== null).length;
      const totalQuestions = detailedQuestions.length;
      const percentage = (answeredCount / totalQuestions) * 100;
      setProgress(percentage);
    };

    const handleSubmitBasicAnswers = async () => {
      const userContent = answers.map((answer, index) => `${detailedQuestions[index].question}: ${answer}`).join('\n');
  
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a career genie helping lead to the greatest career choices while implementing your love for coffee. Give a detailed paragraph analysis of the answers given and then the top 3 job choices with descriptions and why these jobs were a good match. Then generate a short list of jobs that did not match the answers provided. Have a sweet closer about coffee',
            },
            {
              role: 'user',
              content: userContent,
            },
          ],
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
  
        const careerReport = response.choices[0].message.content || '';
      console.log('Career Report:', careerReport);

      setSubmitted(true); // Update state to indicate answers have been submitted
    } catch (error) {
      console.error('Error generating career insights:', error);
      // Handle error or display error message
    }
  };
  // const [project, setProject] = useState<string[]>([
  //   "creative roles",
  //   "analytical roles",
  //   "leadership roles",
  //   "hands-on roles",
  //   "customer service roles",
  // ]);
  // const [fiveOptions, setFiveOptions] = useState<number>(); 

  // const [opinion, setOpinion] = useState<string>();

  // const [skills, setSkill] = useState<string[]>([
  //   "communication and writing",
  //   "critical thinking and analysis",
  //   "time management and organization",
  //   "technical skills",
  //   "creative skills",
  // ]);

  // const [detailedAnswers, setDetailedAnswers] = useState({});
  // const handleSubmitDetailedAnswers = () => {
  //   axios
  //     .post("API_ENDPOINT_URL", detailedAnswers)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting detailed answers:", error);
  //     });
  // };

  // const handleDetailedAnswerChange = (
  //   questionNumber: number,
  //   answer: string
  // ) => {
  //   setDetailedAnswers((prevState) => ({
  //     ...prevState,
  //     [questionNumber]: answer,
  //   }));
  // };

  // function updateProject(event: React.ChangeEvent<HTMLInputElement>) {
  //   const proj = event.target.value;
  //   if (project.includes(proj)) {
  //     setProject(project.filter((e) => e !== proj));
  //   } else {
  //     setProject([...project, proj]);
  //   }
  // }

  // function updateFiveOptions(event: React.ChangeEvent<HTMLInputElement>) {
  //   setFiveOptions(event.target.value);
  // }
  // function updateOpinion(event: React.ChangeEvent<HTMLInputElement>) {
  //   setOpinion(event.target.value);
  // }

  // function updateSkills(event: React.ChangeEvent<HTMLInputElement>) {
  //   const skill = event.target.value;
  //   if (skills.includes(skill)) {
  //     setSkill(skills.filter((e) => e !== skill));
  //   } else {
  //     setProject([...skills, skill]);
  //   }
  // }

  // function QuestionController(QstNum: string) {
  //   switch (QstNum) {
  //     case "next":
  //       if (QuestionView < 10) {
  //         setQuestionView(QuestionView + 1);
  //       }
  //       break;
  //     case "prev":
  //       if (QuestionView > 0) {
  //         setQuestionView(QuestionView - 1);
  //       }
  //       break;
  //     default:
  //       setQuestionView(QuestionView);
  //   }
  // }

  return (
    <div className="Dbody">
      <div className="DQH">Detailed Questions</div>
      <div className="ProgressBarBQ">
        <div className="ActiveProgressBQ" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="QuestionHeader">
      <div>Question {currentQuestionIndex + 1} of {detailedQuestions.length}</div>
      </div>
     <div className="QuestionContainer">
       <h3>{detailedQuestions[currentQuestionIndex].question}</h3>
       {detailedQuestions[currentQuestionIndex].type === 'multiple choice' ? (
         <ul>
           {detailedQuestions[currentQuestionIndex].answers?.map((answer) => (
             <ul key={answer}>
               <input
                 type="radio"
                 id={answer}
                 name={`question${currentQuestionIndex}`}
                 value={answer}
                 checked={answers[currentQuestionIndex] === answer}
                 onChange={() => handleAnswerChange(answer)}
               />
               <label htmlFor={answer}>{answer}</label>
             </ul>
           ))}
         </ul>
       ) : (
         <textarea
           value={answers[currentQuestionIndex] || ''}
           onChange={(e) => handleAnswerChange(e.target.value)}
           placeholder="Please enter your answer here."
         />
       )}
     </div>
     <div className="ButtonContainer">
       <Button className="PrevButton" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
         Previous
       </Button>
       {currentQuestionIndex < detailedQuestions.length - 1 ? (
         <Button className="NextButton" onClick={handleNext}>
           Next
         </Button>
       ) : (
         <Button className="Submit-Button" onClick={handleSubmitBasicAnswers}>
           Submit Answers
         </Button>
       )}
     </div>
   </div>
     
     

  );
}

export default DQPage;