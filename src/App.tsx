import { useState, createContext } from 'react'
import './App.css'
// import Card from './components/Card'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import CardPage from './pages/CardPage.tsx'
import NotFoundPage from './pages/NotFoundPage'
import CreateCardPage from './pages/CreateCardPage'

export interface Card {
    question: string,
    answer: string
}

interface CardsContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const CardsContext = createContext<CardsContextType | undefined>(undefined)
function App() {

  const [cards, setCards] = useState<Card[]>([])
  const [cardsCount, setCardsCount] = useState(0)
  const [allCardsDone, setAllCardsDone] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/card',
      element: <CardPage />
    },
    {
      path: '/create',
      element: 
      (<CardsContext.Provider value={{ cards, setCards }}>
        <CreateCardPage />
      </CardsContext.Provider>),
    }
  ]);

// TODO: Add card and romove card

//   function nextCard()
//   {
//     if(cardsCount === cards.length - 1){
//       setAllCardsDone(true)
//     } else {
//       setCardsCount(cardsCount + 1)
//     }
//   }

//   function recite()
//   {
//     setCardsCount(0)
//     setAllCardsDone(false)
//   }

//   const cardElemnet = cards.length === 0 ?
//     <Card 
//       key={cardsCount} 
//       noCard={true}
//       addCard={() => {}}
//     />
//   : 
//    <Card 
//       key={cardsCount} 
//       question={cards[cardsCount].question} 
//       answer={cards[cardsCount].answer}
//       nextCard={nextCard}
//       allCardsDone={allCardsDone}
//       recite={() => recite()}
//       noCard={cards.length === 0}
//       addCard={() => {}}
//     />

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
