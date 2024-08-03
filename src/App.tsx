import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [cards, setCards] = useState([
    {
      question: "What is your name?",
      answer: "Jane Doe"
    }
  ])
  const [cardsCount, setCardsCount] = useState(0)
  const [allCardsDone, setAllCardsDone] = useState(false);

  function addCard()
  {
    setCards([...cards, {question: "What is your name?", answer: "Jane Doe"}])
  }
  function removeCard()
  {
    setCards(cards.filter((card, index) => index !== cardsCount))
  }
  function nextCard()
  {
    if(cardsCount === cards.length - 1){
      setAllCardsDone(true)
    } else {
      setCardsCount(cardsCount + 1)
    }
  }

  function recite()
  {
    setCardsCount(0)
    setAllCardsDone(false)
  }

  const cardElemnet = <Card 
                        key={cardsCount} 
                        question={cards[cardsCount].question} 
                        answer={cards[cardsCount].answer}
                        nextCard={nextCard}
                        allCardsDone={allCardsDone}
                        recite={() => recite()}
                      />

  return (
    <>
      {cardElemnet}
    </>
  )
}

export default App
