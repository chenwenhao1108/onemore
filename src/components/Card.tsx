import React from "react";

export default function Card(props: {question?: string, answer?: string, nextCard: () => void, recite: () => void, allCardsDone: boolean})
{
    const [displayAnswer, setDisplayAnswer] = React.useState(false);
    
    // Handle forget answer
    function forgetAnswer()
    {
        // TODO: Caculate when is the next time showing this card
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
