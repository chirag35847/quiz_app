import { useState, useCallback } from "react"
import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png'
import ProgressBar from "./ProgressBar.jsx";
import { CORRECT, INCORRECT, ANSWERED, UNANSWERED } from "../constants.js";

export default function Quiz(){
    // what is current active question -> do not want to manage explicity
    // why?? answers leng === 0, display the first question

    // what are the answers that the user has given
    // first state can be derived from answers list
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState(UNANSWERED);
    const activeQuestionIndex = userAnswers.length;
    const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState(ANSWERED);
        setUserAnswers((prevSelectedAnswers)=>{
            return [...prevSelectedAnswers, selectedAnswer]
        })

        setTimeout(()=>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState(CORRECT)
            } else {
                setAnswerState(INCORRECT);
            }

            setTimeout(()=>{
                setAnswerState(UNANSWERED);
            }, 2000)
        }, 1000)
    }, [])

    const handleSkipQuestion = useCallback(function handleSkipQuestion(){
        handleSelectAnswer(null);
    }, [])

    if (isQuizComplete) {
        return (
            <div id='summary'>
                <img src={quizComplete} alt="trophy image"></img>
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const shulledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shulledAnswers.sort(()=>Math.random()-0.5);

    return (
        <div id='quiz'>
            <div id='question'>
                <ProgressBar 
                    key={activeQuestionIndex}
                    timeout={10000} 
                    onTimout={handleSkipQuestion}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shulledAnswers.map((answer)=>{
                        let cssClass = ""
                        const isSelected = userAnswers[userAnswers.length-1] == answer;
                        if (answerState === ANSWERED && isSelected){
                            cssClass = 'selected';
                        }
                        if (answerState == INCORRECT && isSelected){
                            cssClass = 'wrong';
                        }
                        if (answerState == CORRECT && isSelected){
                            cssClass = 'correct';
                        }
                        return (
                            <li key={answer} className='answer'>
                                <button onClick={()=>handleSelectAnswer(answer)} className={cssClass}>
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}