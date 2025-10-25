import QUESTIONS from '../questions.js'
import ProgressBar from './ProgressBar'
import Answers from './Answers'
import { useCallback, useState} from 'react';
import { CORRECT, INCORRECT, ANSWERED, UNANSWERED } from "../constants.js";

export default function Question({ handleSkipQuestion, onSelectAnswer, activeQuestionIndex}) {
    const [answerState, setAnswerState] = useState({
        selectedAnswer: "",
        isCorrect: null
    });

    let timer = 10000
    if (answerState.selectedAnswer!==""){
        timer = 1000
    } else if (answerState.selectedAnswer!=="" && answerState.isCorrect!==null){
        timer = 2000
    }

    const handleSelectAnswer = useCallback((selectedAnswer)=>{
        setAnswerState({
            selectedAnswer: selectedAnswer,
            isCorrect: null
        })
        setTimeout(() => {
            setAnswerState({
                selectedAnswer: selectedAnswer,
                isCorrect: selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]
            })

            setTimeout(() => {
                setAnswerState({
                    selectedAnswer: "",
                    isCorrect: null
                })
                console.log("Updating the answers array")
                onSelectAnswer(selectedAnswer)
            }, 2000)
        }, 1000)
    },[onSelectAnswer])

    let currentAnswerState = UNANSWERED;
    if (answerState.selectedAnswer==="" && answerState.isCorrect===null){
        currentAnswerState = UNANSWERED
    } else if (answerState.selectedAnswer!=="" && answerState.isCorrect===null){
        currentAnswerState = ANSWERED
    } else if (answerState.selectedAnswer!=="" && answerState.isCorrect!==null){
        if (answerState.isCorrect) {
            currentAnswerState = CORRECT
        } else {
            currentAnswerState = INCORRECT
        }
    }

    let mode = ""
    if (answerState.selectedAnswer!=="") {
        mode = "answered"
    }

    return <div id='question'>
        <ProgressBar
            key={timer}
            timeout={timer}
            onTimout={timer!=10000?function(){}:handleSkipQuestion}
            mode={mode}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
            answerState={currentAnswerState}
            handleSelectAnswer={handleSelectAnswer}
            activeQuestionIndex={activeQuestionIndex}
            selectedAnswer={answerState.selectedAnswer}
        />
    </div>
}