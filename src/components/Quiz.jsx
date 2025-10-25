import { useState, useCallback } from "react"
import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png'
import  Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevSelectedAnswers) => {
            return [...prevSelectedAnswers, selectedAnswer]
        })
    }, [])

    const handleSkipQuestion = useCallback(function handleSkipQuestion() {
        handleSelectAnswer(null);
    }, [])

    if (isQuizComplete) {
        return (
            <Summary userAnswers={userAnswers}/>
        )
    }

    return (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                handleSkipQuestion={handleSkipQuestion}
                onSelectAnswer={handleSelectAnswer}
                activeQuestionIndex={activeQuestionIndex}
            />
        </div>
    )
}