import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");

        console.log(auth);
      })
      .catch((error) => alert(error.message));
  };

  const googleSignIn = () => {
    //sign in
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        // console.log(result);
        // console.log("erfergrgerg");
      })

      .catch((error) => console.log(error));
    // console.log(error);
  };

  return (
    <div>
      <div className="login">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="login__logo">
            <h1>Foodie</h1>
          </div>
        </Link>

        <div className="login__container">
          <h2>Sign in</h2>

          <form>
            <h5>E-mail</h5>
            <input
              className="field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="login__signInButton"
              onClick={signIn}
            >
              Sign In
            </button>

            <p>
              By signing-in you agree to Foodie's Conditions. Please see your
              privacy Notice, our Cookies Notice and our Interest-Based Ads
              Notice
            </p>

            <button className="login__registerButton" onClick={register}>
              Create your Foodie Account
            </button>
          </form>
          <button
            type="submit"
            className="login__signInButton"
            onClick={googleSignIn}
          >
            signIn with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
