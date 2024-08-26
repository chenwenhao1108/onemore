import { useState } from "react"



export default function CardContent(prop) {
    const [showAnswer, setShowAnswer] = useState({})

    return (
        <ol>
        {prop.allCards.map((card, index) => (
          <div>
            <li className="all-cards-page-question"
            onClick={() => setShowAnswer(
                (p) => {
                    return{
                        ...p,
                        [index]: !p[index]
                    }
            })}
            >{card.question}</li>
            <p className="all-cards-page-answer" 
            style={{
              display: showAnswer[index] ? "block" : "none"
            }}
            >{card.answer}</p>
          </div>
          ))}
      </ol>
    )
}