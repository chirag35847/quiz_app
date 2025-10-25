import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png'

export default function Summary({userAnswers}) {
    const totalAnsers = userAnswers.length;

    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const noCorrectAnswers = correctAnswers.length
    const noSkipped = skippedAnswers.length
    const incorrect = totalAnsers - noCorrectAnswers - noSkipped

    const skippedAnswerPerc =Math.round((noSkipped/totalAnsers) * 100);
    const correctPrec = Math.round((noCorrectAnswers/totalAnsers) * 100);
    const wrongPerc = 100 - correctPrec - skippedAnswerPerc;

    return (
        <div id="summary">
            <img src={quizComplete} alt='trophy icon'></img>
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswerPerc}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className='number'>{correctPrec}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongPerc}%</span>
                    <span className="text">answered in-correctly</span>
                </p>
            </div>
            <ol>
                {
                    userAnswers.map((answer, index) => {
                        let cssClass = 'user-answer';
                        if (answer === null){
                            cssClass += ' skipped';
                        } else if (answer === QUESTIONS[index].answers[0]){
                            cssClass += ' correct'
                        } else {
                            cssClass += ' wrong';
                        }

                        return (
                            <li key={index}>
                                <h3>{index+1}</h3>
                                <p className='question'>{QUESTIONS[index].text}</p>
                                <p className={cssClass}>{answer ?? "Skipped"}</p>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}