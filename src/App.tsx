import { useState, createContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { collection, doc, getDocs, query, Timestamp, where } from 'firebase/firestore'
import { db } from '../firebase'
import { auth } from '../firebase' 
import { onAuthStateChanged } from 'firebase/auth'
import HomePage from './pages/HomePage.tsx'
import CardPage from './pages/CardPage.tsx'
import NotFoundPage from './pages/NotFoundPage'
import CreateCardPage from './pages/CreateCardPage'
import AllcardsPage from './pages/AllcardsPage'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'

export interface Card {
    id: string,
    question: string,
    answer: string,
    nextShow: Timestamp,
    correctTimes: number
}

interface CardsContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const CardsContext = createContext<CardsContextType | undefined>(undefined)
export const AllCardsContext = createContext(undefined)
export const UserContext = createContext(null)
function App() {

  const [cards, setCards] = useState<Card[]>([])
  const [allCards, setAllCards] = useState<Card[]>([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state changed")
      setUser(currentUser)
      if (currentUser) {
        const today = new Date
              today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
              tomorrow.setDate(today.getDate() + 1)
  
        const todayTimestamp = Timestamp.fromDate(today)
  
        const cardsCollection = 
              collection(doc(db, "users", currentUser.uid as string), "cards")
        const q = query(cardsCollection, where("nextShow", "<=", todayTimestamp))
  
        getDocs(q)
        .then((snapshot) => {
          const cardsArr = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              question: doc.data().question,
              answer: doc.data().answer,
              nextShow: doc.data().nextShow,
              correctTimes: doc.data().correctTimes
            }
          })
          setCards(cardsArr)
          console.log("cards setted")
          setLoading(false)
        })

        getDocs(cardsCollection)
          .then((allCardsSnapshot) => {
            const cardsArr = allCardsSnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                question: doc.data().question,
                answer: doc.data().answer,
                nextShow: doc.data().nextShow,
                correctTimes: doc.data().correctTimes
              }
            })
            setAllCards(cardsArr)
          })
      } else {
        console.log("have not log in")
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const router = createBrowserRouter([
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <LoginPage />
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <RegisterPage />
    },
    {
      path: '/',
      element: user ? 
      (<CardsContext.Provider value={{cards, setCards}}>
        <HomePage />
      </CardsContext.Provider>)
         : <Navigate to="/login" />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/card',
      element: 
      user ? (<CardsContext.Provider value={{ cards, setCards }}>
        <CardPage />
      </CardsContext.Provider>) : <Navigate to="/login" replace={true} />,
    },
    {
      path: '/create',
      element: 
        user ? <CreateCardPage /> : <Navigate to="/login" replace={true} />
    },
    {
      path: '/allcards',
      element: 
      user ? (<AllCardsContext.Provider value={{ allCards, setAllCards }}>
        <AllcardsPage />
      </AllCardsContext.Provider>) : <Navigate to="/login" replace={true} />,
    },
  ]);

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
