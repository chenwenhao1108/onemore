import React from "react";


interface CardProps {
    question?: string, 
    answer?: string, 
    nextCard?: () => void, 
    recite?: () => void, 
    allCardsDone?: boolean,
    noCard?: boolean,
    addCard?: () => void,
}

export default function Card(props: CardProps)
{
    const [displayAnswer, setDisplayAnswer] = React.useState(false);
    
    // Handle forget answer
    function forgetAnswer()
    {
        // TODO: Caculate when is the next time showing this card
    }

    if(props.noCard) {
        return(
            <div className="card">
                <h5 className="card-question">No Card Yet</h5>
                <p className="card-answer">You Can Create A New Card Here~</p>
                {/* <textarea data-testid="question-textarea" className="card-question" placeholder="No Card Yet" />
                <textarea data-testid="answer-textarea" className="card-answer" placeholder="You Can Create A New Card Here" /> */}
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={props.addCard}>Create</button>
                </div>
            </div>
        )
    }
    // check if all cards are done
    if (props.allCardsDone) {
        return(
            <div className="card">
                <h5 className="card-question">Congratulations!</h5>
                <p className="card-answer">You have completed all the cards!</p>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={props.recite}>Recite Again</button>
                </div>
            </div>
        )
    } else {
        return(
            <div className="card">
                <h5 className="card-question">{props.question}</h5>
                <p className="card-answer" style={{display: displayAnswer ? "block" : "none"}}>{props.answer}</p>
                <div className="card-footer" onClick={() => setDisplayAnswer(!displayAnswer)}>
                    <button data-testid="forget-button" className="btn btn-primary" style={{display: displayAnswer ? "none" : "block"}} onClick={forgetAnswer}>
                        Forget
                    </button>
                    <button data-testid="not-sure-button" className="btn btn-primary" style={{display: displayAnswer ? "none" : "block"}} onClick={forgetAnswer}>
                        Not Sure
                    </button>
                    <button data-testid="clear-next-button" className="btn btn-primary" onClick={displayAnswer ? props.nextCard : () => {}}>
                        {displayAnswer ? "Next" : "Clear"}
                    </button>
                </div>
           </div>
    
        )
    }
}
