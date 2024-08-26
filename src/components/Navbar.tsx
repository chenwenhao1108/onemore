import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";


export default function Navbar()
{
    const [username, setUsername] = useState("")
    const { user } = useContext(UserContext)
    const userDocRef = doc(collection(db, "users"), user.uid)
    const getUsername = async() => {
        const userSnapshot = await getDoc(userDocRef)
        return userSnapshot.data().username
    }

    getUsername()
    .then(data => setUsername(data))

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="navbar-title">
                    <Link to="/">OneMore</Link>
                </div>
            </div>
            <div className="navbar-right">
                <Link to="/allcards" className="navbar-username">{username}</Link>
                {user ? (<a href="#" className="logout-btn" onClick={logout}>LogOut</a>) : (<Link to="/login">LogIn</Link>)}
            </div>
        </div>
    )
}