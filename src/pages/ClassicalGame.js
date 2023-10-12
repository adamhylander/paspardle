import { useState, useEffect } from "react";
import QuestionBox from '../components/QuestionBox';
import { useNavigate } from 'react-router-dom';
import './styling/ClassicalGame.css'
import ClassicalLossScreen from './ClassicLossScreen';
import { useAuth0 } from "@auth0/auth0-react";
import IsLoading from "../components/IsLoading"

function ClassicalGame() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const navigate = useNavigate(); 
  const [values, setValues] = useState([]);    
  const [currentIndex, setCurrentIndex] = useState(2);
  const [timer, setTimer] = useState(10);
  const [currentlyLoading, setLoading] = useState(true);
  const [correctAnswer, setCorrect] = useState(false);
  const [currentScore, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [time, setTime] = useState(0); 
  const [lost, setLost] = useState(false);
  const [paspardleValues, setPaspardle] = useState();
  const [stad, setStad] = useState();

  useEffect(() => {
    if (values){
      if(!lost){
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 1) {
              setCurrentIndex((prevIndex) => {
                if (prevIndex < values.length - 1) {
                  return prevIndex + 1;
                } else {
                  const answer = window.prompt('Enter your answer');
                  if (answer !== null) {
                    handleAnswerSubmission(answer.trim())
                  }
                  return prevIndex; 
                }
                
              });
              if (!correctAnswer){
                setTime((prevTime) => {
                  return prevTime + (10);
                });
              }
              return 10; // Reset timer to 10 when it reaches 1
            } else {
              return prevTimer - 1;
            }
          });
        }, 1000);
  
    return () => clearInterval(intervalId); // Clean up the timer when the component unmounts
  }}}, [values]);

  const handleAnswerSubmission = (answer, points) => {
      if (values.length > 0 && answer.toLowerCase() === values[0].toLowerCase()) {
        setCorrect(true);
        setValues(null);
        setScore((prevScore) => {
          return prevScore+points;
        });        
        setTime((prevTime) => {
          return prevTime + (10-timer);
        });
        setRound((prevRound) => {
          return prevRound+1;
        })
        setCorrect(true);
        
        const intervalID = setTimeout(() =>{
          setCurrentIndex(2)
          setTimer(10); 
          setCorrect(false);
          getRandomValues();
        }, 5000);
        return () => clearTimeout(intervalID);
      } else {
        setTime((prevTime) => {
          return prevTime + (10-timer);
        });
          const finalTime = time + (10-timer)
          setLost(true);
          postScore(finalTime);
          setValues([]);
      }
  };



  useEffect(() => {
    getRandomValues();
  },[]);

  async function getRandomValues(){
    if(!paspardleValues){

      const response = await fetch("/get_paspardle")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch((error) => console.log(error));
      setLoading(false);
      const min = 1;
      const max = response.length-1;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      let value = response[rand];
      let questions = [value.Stad,value.År,value.Q1,value.Q2,value.Q3,value.Q4,value.Q5]
      setValues(questions);
      setStad(questions[0]);
      setPaspardle(response);
    }
    else{
      const min = 1;
      const max = paspardleValues.length-1;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      let value = paspardleValues[rand];
      let questions = [value.Stad,value.År,value.Q1,value.Q2,value.Q3,value.Q4,value.Q5]
      setStad(questions[0]);
      setValues(questions);
    } 
  }

  async function postScore(finalTime){
    let scoreValues;
    if(isAuthenticated){
      scoreValues = {
        "points" : currentScore,
        "time" : finalTime,
        "round" : round,
        "userName" : user.email
      };      
    }else{
      scoreValues = {
        "points" : currentScore,
        "time" : finalTime,
        "round" : round,
        "userName" : "Guest"
      };      
    }
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreValues)
    };
    
    try{
      const result = await fetch("/store_score",options);

    }catch (ex) {
      console.log(ex);
    }

  }

  function resetGame(){
    setTimer(10);
    setCurrentIndex(2);
    setScore(0);
    setRound(1);
    setTime(0);
    setLost(false);
    getRandomValues();
  }

  if (currentlyLoading) {
    return <IsLoading />
  }

  else if (correctAnswer){
    return( 
    
    <div className='correctContainer'>
      <h2 className='correctHeader'>Du hade rätt!</h2>
      <div className='correctDiv'>Nästa fråga kommer om alldeles strax.</div>

    </div>
    
    )
  }
  else if (lost){
    const finalAnswer = stad;
    const FinalPoints = currentScore;
    const finalTime =  time;
    const finalRound = round;
    return(
      <div className='LossContainer'>
        <ClassicalLossScreen 
          answer = {finalAnswer}
          points = {FinalPoints}
          time =  {finalTime}
          round = {finalRound}
        />
        <div className="buttonDiv">
          <button className="lossButton" onClick={resetGame}>Spela en till omgång</button>
          <button className="lossButton" onClick={() => navigate('/')}>Återvänd till hemskärmen</button>
        </div>
      </div>
    )
  }
  else{
    return (
      <div>
        {values.slice(2, currentIndex + 1).map((value, index) => (
          <div key={index}>
            <QuestionBox
              title={(10 - index * 2) + " poängsfrågan"}
              content={value}
              disabled={index !== currentIndex - 2}
              onClick={() => {
                const answer = window.prompt('Vart är vi påväg?');
                if (answer !== null) {
                    handleAnswerSubmission(answer.trim(), (10 - index * 2));
                }
            }}
            />
          </div>
          ))}
        <div className="timer-container">
          <div className="timer-box">
            <p className="timer-digit">{Math.floor(timer / 10)}</p>
          </div>
          <div className="timer-box">
            <p className="timer-digit">{timer % 10}</p>
          </div>
        </div>
      </div>
    );
}
}

export default ClassicalGame;