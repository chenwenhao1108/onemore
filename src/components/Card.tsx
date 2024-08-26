import React, { useState } from "react";
import { Link } from "react-router-dom";

interface CardProps {
    question?: string, 
    answer?: string,
    nextCard?: () => void, 
    recite?: () => void, 
    allCardsDone?: boolean,
    noCard?: boolean,
    handleClear?: () => void,
    handleForget?: (correctTimes) => void,
}

export default function Card(props: CardProps)
{
    const [displayAnswer, setDisplayAnswer] = React.useState(false);
    const [displayMisrememberedBtn, setDisplayMisremenberedBtn] = useState(false)

    if(props.noCard) {
        return(
            <div className="card">
                <h5 className="card-question">No Card Yet</h5>
                <p className="card-answer">You Can Create A New Card Here~</p>
                <div className="card-footer">
                    <Link to="/create">Create</Link>
                </div>
            </div>
        )
    }
    // check if all cards are done
    if (props.allCardsDone) {
        return(
            <div className="card">
                <h5 className="card-question">Good for you!</h5>
                <p className="card-answer">You have completed today's cards!</p>
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
                    <button 
                        data-testid="forget-button" 
                        className="btn btn-primary card-btn" 
                        style={{display: displayAnswer ? "none" : "block"}} 
                        onClick={() => props.handleForget(0)}>
                            Forget
                    </button>
                    <button 
                        data-testid="not-sure-button" 
                        className="btn btn-primary card-btn" 
                        style={{display: displayAnswer ? "none" : "block"}} 
                        onClick={() => {
                            setDisplayMisremenberedBtn(true)
                            props.handleForget(2)}}>
                            Not Sure
                    </button>
                    <button 
                        data-testid="clear-next-button" 
                        className="btn btn-primary card-btn" 
                        style={{display: displayAnswer ? "none" : "block"}} 
                        onClick={() => setDisplayMisremenberedBtn(true)}>
                            Clear
                    </button>
                    <button 
                        data-testid="misremembered-button" 
                        className="btn btn-primary card-btn" 
                        style={{display: displayMisrememberedBtn ? "block" : "none" }} 
                        onClick={(e) => {
                            e.stopPropagation()
                            setDisplayMisremenberedBtn(false)
                            props.handleForget(0)}}>
                            Misremembered
                    </button>
                    <button 
                        data-testid="next-button" 
                        className="btn btn-primary card-btn" 
                        style={{display: displayAnswer ? "block" : "none"}} 
                        onClick={() => {
                            setDisplayMisremenberedBtn(false)
                            props.handleClear()
                            props.nextCard()
                            }}>
                            Next
                    </button>
                </div>
           </div>
    
        )
    }
}
