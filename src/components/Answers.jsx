import { CORRECT, INCORRECT, ANSWERED } from "../constants.js";
import { useRef } from "react";
import QUESTIONS from '../questions.js'

export default function Answers({ answerState, handleSelectAnswer, activeQuestionIndex, selectedAnswer}) {
    const shuffledAnswersRef = useRef();
    if (!shuffledAnswersRef.current){
        shuffledAnswersRef.current = [...QUESTIONS[activeQuestionIndex].answers];
        shuffledAnswersRef.current.sort(() => Math.random() - 0.5);
    }
    
    return <ul id='answers'>
        {shuffledAnswersRef.current.map((answer) => {
            let cssClass = ""
            const isSelected = selectedAnswer == answer;
            if (answerState === ANSWERED && isSelected) {
                cssClass = 'selected';
            }
            if (answerState == INCORRECT && isSelected) {
                cssClass = 'wrong';
            }
            if (answerState == CORRECT && isSelected) {
                cssClass = 'correct';
            }
            return (
                <li key={answer} className='answer'>
                    <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                        {answer}
                    </button>
                </li>
            )
        })}
    </ul>
}