import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { CardsContext } from "../App";


export default function HomePage() {
    console.log("use cards")
    const { cards } = useContext(CardsContext)
    const cardsLen = cards.length

    useEffect(() => {

    }, [])

    return (
        <>
            <Navbar />
            <div className="card-page">
                <div className="dashboard-card">
                <div className="dashboard-checkin">
                    <h3>Misson Today:</h3>
                    <h5> {cardsLen} cards</h5>
                </div>
                    <div className="dashboard-footer">
                        <Link className="dashboard-btn" to="/create">Create Card</Link>
                        <div className="dashboard-footer-divider"></div>
                        <Link className="dashboard-btn" to="/card">Keep Going</Link>
                    </div>
                </div>
            </div>
        </>
    );
}