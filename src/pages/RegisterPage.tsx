import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";

export default function RegisterPage() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [username, setUsername] = useState("")

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            )
            const user = userCredential.user
            await saveUsernameToFirestore(user, username);

            console.log('User registered successfully.');
        } catch (error) {
            console.log(error.message)
        }
    }

    async function saveUsernameToFirestore(user, username) {
        const userDocRef = doc(collection(db, "users"), user.uid)
        setDoc(userDocRef, {
            username: username
        })
    }

    return (
        <div className="login-page">
            <h1>Register Page</h1>
                <div className="login-form">
                <input className="register-name"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input className="login-email"
                id="registerEmail"
                type="text"
                placeholder="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input className="login-password"
                type="password"
                placeholder="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button 
                className="login-btn"
                onClick={register}>Register</button>
                <hr className="login-hr"></hr>
            </div>
            <Link to="/login">Click here to login</Link>
        </div>
    )
}