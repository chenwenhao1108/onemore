import { useContext } from "react"
import { AllCardsContext } from "../App";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import CardContent from "../components/CardContent"

export default function AllcardsPage()
{
    const { allCards } = useContext(AllCardsContext)

  return (
    <>
      <Navbar />
      {allCards.length ?  
      <CardContent allCards={allCards} />
      :
      <div className="card-page">
        <div className="card">
          <h5 className="card-question">No Card Yet</h5>
          <p className="card-answer">You Can Create A New Card Here~</p>
          <div className="card-footer">
              <Link to="/create">Create</Link>
          </div>
        </div>
      </div>
      }
    </>
  )
}