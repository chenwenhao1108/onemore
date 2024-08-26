import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function LoginPage()
{
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const login = async () => {
        try {
            const user = 
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <div className="login-form">
        <input className="login-email"
          id="loginEmail"
          type="text"
          placeholder="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input className="login-password"
          type="password"
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button 
        className="login-btn"
        onClick={login}>Login</button>
        <hr className="login-hr"></hr>
        <Link to="/register">Click here to register</Link>
      </div>
    </div>
  );
}