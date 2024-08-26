import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { CardsContext, UserContext } from "../App";
import { collection, doc, Timestamp, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

export default function CardPage() {
    const { cards, setCards } = useContext(CardsContext);
    const { user } = useContext(UserContext)
    const [cardsCount, setCardsCount] = useState(0)
    const [allCardsDone, setAllCardsDone] = useState(false);
    const [changes, setChanges] = useState([])

    function nextCard()
    {
      if(cardsCount === cards.length - 1){
        setAllCardsDone(true)
        updateDb()
      } else {
        setCardsCount(cardsCount + 1)
      }
    }
  
    function recite()
    {
      setCardsCount(0)
      setAllCardsDone(false)
    }

    function updateCards(cardsCount, correctTimes, nextShow) {
      const newCards = cards.map((card, index) => {
        if (index === cardsCount) {
          return {
            ...card,
            nextShow: nextShow,
            correctTimes: correctTimes
          }
        } else {
          return card
        }
      })
      setCards(newCards)
      setChanges([...changes, {index: cardsCount,
        updatedFields: {
          nextShow: nextShow,
          correctTimes: correctTimes
        }
      }])
    }
  
    function handleForget(correctTimes) {
      const nextShowDate = new Date
            nextShowDate.setDate(nextShowDate.getDate() + 1)
      const nextShowDateTimestamp = Timestamp.fromDate(nextShowDate)
      updateCards(cardsCount, correctTimes, nextShowDateTimestamp)
    }

    function handleClear() {
      let days = 0
      const correctTimes = cards[cardsCount].correctTimes
      switch (correctTimes) {
        case 0:
          days = 1
          break;
        case 1:
          days = 3
          break;
        case 2:
          days = 7
          break;
        case 3:
          days = 12
          break;
        case 4:
          days = 30
          break;
        case 5:
          days = 60
          break;
        default:
          days = 1
      }
      const nextShowDate = new Date
        nextShowDate.setHours(0, 0, 0, 0)
        nextShowDate.setDate(nextShowDate.getDate() + days)
      const nextShowDateTimestamp = Timestamp.fromDate(nextShowDate)
      updateCards(cardsCount, correctTimes + 1, nextShowDateTimestamp)
    }

    async function updateDb() {
      const batch = writeBatch(db)
      const cardsCollection = 
            collection(doc(db, "users", user.uid as string), "cards")

      changes.forEach(({index, updatedFields}) => {
        const cardId = cards[index].id
        const cardRef = doc(cardsCollection, cardId)

        batch.update(cardRef, updatedFields)
      })

      try {
        await batch.commit()
        console.log("Document updated")
        setChanges([])
      } catch(error) {console.error("Error updating document: ", error)}
    }

    const cardElemnet = cards.length === 0 ?
      <Card 
        key={cardsCount} 
        noCard={true}
      />
    : 
     <Card 
        key={cardsCount} 
        question={cards[cardsCount].question} 
        answer={cards[cardsCount].answer}
        nextCard={nextCard}
        allCardsDone={allCardsDone}
        recite={() => recite()}
        noCard={cards.length === 0}
        handleClear={handleClear}
        handleForget={handleForget}
      />

    return (
      <>
        <Navbar />
        <div className="card-page">
          {cardElemnet}
        </div>
      </>
        
    );
}