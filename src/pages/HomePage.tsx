import { Link } from "react-router-dom";
export default function HomePage() {
    return (
        <div className="card-page">
            <div className="card">
                <button>
                    <Link to="/card">Keep Going</Link>
                </button>
                <button>
                    <Link to="/create">Create Card</Link>
                </button>
            </div>
        </div>
    );
}