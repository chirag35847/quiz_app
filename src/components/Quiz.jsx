import { useState } from "react"
import QUESTIONS from '../questions.js'

export default function Quiz(){
    // what is current active question -> do not want to manage explicity
    // why?? answers leng === 0, display the first question

    // what are the answers that the user has given
    // first state can be derived from answers list
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevSelectedAnswers)=>{
            return [...prevSelectedAnswers, selectedAnswer]
        })
    }

    return (
        <div id='quiz'>
            <div id='question'>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {QUESTIONS[activeQuestionIndex].answers.map((answer)=>{
                        return (
                            <li key={answer} className='answer'>
                                <button onClick={()=>handleSelectAnswer(answer)}>
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