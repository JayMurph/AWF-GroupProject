import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import { USER_ID_KEY, USERNAME_KEY, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, COOKIE_KEYS, PASSWORD_KEY, FIRST_NAME_KEY, EMAIL_KEY} from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";
import { decodeToken, isExpired } from 'react-jwt';
import { LogoutUser } from "./ApiCalls";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function isAuthenticated(cookies) {
  return cookies.accessToken && 
    !isExpired(cookies.accessToken);
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(COOKIE_KEYS);
  const [authenticated, setAuthenticated] = useState(()=>isAuthenticated(cookies));
  const [userId, setUserId] = useState(cookies.userId);

  console.log(cookies);
  console.log(cookies.accessToken);
  console.log(decodeToken(cookies.accessToken));
  console.log(isExpired(cookies.accessToken));

  const onLogout = async () => {
    try {
      if (cookies.refreshToken) {
        await LogoutUser(cookies.refreshToken);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setAuthenticated(false);
      setUserId(null);
      clearCookies();
    }
  };

  const onLogin = async (tokens) => {
    if (tokens) {
      const dt = decodeToken(tokens.accessToken);
      setCookies(tokens.accessToken, tokens.refreshToken, dt.sub, dt.userName, dt.password, dt.firstName, dt.email);
      setUserId(dt.sub);
      setAuthenticated(true);
    }
  }

  const setCookies = (accessToken, refreshToken, userId, username, password, firstName, email) => {
    const options = {path:"/"};
    setCookie(ACCESS_TOKEN_KEY, accessToken, options);
    setCookie(REFRESH_TOKEN_KEY, refreshToken, options);
    setCookie(USER_ID_KEY, userId, options);
    setCookie(USERNAME_KEY, username, options);
    setCookie(PASSWORD_KEY, password, options);
    setCookie(FIRST_NAME_KEY, firstName, options);
    setCookie(EMAIL_KEY, email, options);
  } 

  const clearCookies = () => {
    const options = {path:"/"};
    removeCookie(ACCESS_TOKEN_KEY, options);
    removeCookie(REFRESH_TOKEN_KEY, options);
    removeCookie(USER_ID_KEY, options);
    removeCookie(USERNAME_KEY, options);
    removeCookie(PASSWORD_KEY, options);
    removeCookie(FIRST_NAME_KEY, options);
    removeCookie(EMAIL_KEY, options);
  }

  return (
    <Router>
      <Navbar authenticated={authenticated} onLogout={onLogout} />
      <AppContentContainer>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {authenticated ? (
            <Route path="/quiz" element={<Quiz userId={userId} accessToken={cookies.accessToken}/>} />
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={onLogin}/>} />
              <Route
                path="/sign-up"
                element={<SignUp />}
              />
            </>
          )}
        </Routes>
      </AppContentContainer>
    </Router>
  );
}

export default App;
