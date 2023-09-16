import { useState } from "react";

import { resultInitalState } from "../constants";

import QuizzLogo from '../assets/quizzmind.logo.png';

const Quiz = ({ questions }) => {

    const [currentQuestions, setCurrentQuestions] = useState(0);
    const { question, choices, correctAnswer} = questions [currentQuestions] ;
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitalState);
    const [showResult, setShowResult] = useState(false);


    const onAnwserClick = (answer, index) => {
      setAnswerIdx(index);
      if(answer === correctAnswer ) {
        setAnswer(true)
      } else {
        setAnswer(false)
      }
    }

    const onClickNext = () =>{
      setAnswerIdx(null);
      setResult((prev) =>
        answer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        } : {
          ...prev,
          wrongAnswers: prev.wrongAnswers +1,
        }
      );

      if(currentQuestions !== questions.length -1) {
        setCurrentQuestions((prev) => prev +1)
      } else {
        setCurrentQuestions(0);
        setShowResult(true);
      }
    }

    const onTryAgain = () => {
      setResult(resultInitalState);
      setShowResult(false)
    }

    return (
      <div className="quizz-container">
        <div className="logo-container">
          <img src={QuizzLogo} alt='logo' width={90} height={90}/>
          <h1>QuizzyMind <br/> Let's Play!</h1>
        </div>
        {!showResult ? (
          <>
            <span className="active-question-no">{currentQuestions + 1}</span>
            <span className="total-questions">/{questions.length}</span>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnwserClick(answer, index)}
                  key={answer}
                  className={answerIdx === index ? 'selected-answer' : null}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="footer">
              <button onClick={onClickNext} disabled={answerIdx === null}>
                {currentQuestions === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>Total Questions : <span>{questions.length}</span></p>
            <p>Total Score : <span>{result.score}</span></p>
            <p>Total Correct Answer : <span>{result.correctAnswers}</span></p>
            <p>Total Wrong Answer : <span>{result.wrongAnswers}</span></p>
            <button onClick={onTryAgain}> Try again</button>
          </div>
        )}
      </div>
    );
} 

export default Quiz;