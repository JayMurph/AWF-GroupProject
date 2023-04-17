import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import {
  USER_ID_KEY,
  USERNAME_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  COOKIE_KEYS,
  PASSWORD_KEY,
  FIRST_NAME_KEY,
  EMAIL_KEY,
} from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";
import { decodeToken, isExpired } from "react-jwt";
import { LogoutUser, RenewAccessToken } from "./ApiCalls";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const COOKIE_OPTIONS = { path: "/" };

function isAuthenticated(cookies) {
  return cookies.accessToken && !isExpired(cookies.accessToken);
}

/**
 * Contains main routes for the trivia site app. Handles user auth
 * @returns component
 */
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(COOKIE_KEYS);
  const [authenticated, setAuthenticated] = useState(() =>
    isAuthenticated(cookies)
  );
  const [userId, setUserId] = useState(cookies.userId);

  /**
   * callback for user logging in. Saves user info to cookies and sets user as
   * authenticated
   * @param {*} tokens : contains JWT accessToken and refreshToken fields
   */
  const onLogin = async (tokens) => {
    if (tokens) {
      const dt = decodeToken(tokens.accessToken);
      setCookies(
        tokens.accessToken,
        tokens.refreshToken,
        dt.sub,
        dt.userName,
        dt.password,
        dt.firstName,
        dt.email
      );
      setUserId(dt.sub);
      setAuthenticated(true);
    }
  };

  /**
   * Callback for user logging out. De-authorizes user 
   */
  const onLogout = async () => {
    try {
      if (cookies.refreshToken) {
        await LogoutUser(cookies.refreshToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticated(false);
      setUserId(null);
      clearCookies();
    }
  };

  /**
   * renews the user's access token and saves it back to cookies
   * @returns boolean : true if access token was renewed, otherwise false
   */
  const renewAccessToken = async() => {
    let renewed = false;
    if (cookies.accessToken && cookies.refreshToken) {
      renewed = await RenewAccessToken(cookies.refreshToken)
        .then((res)=>res.json())
        .then((resData)=>{
          setCookie(ACCESS_TOKEN_KEY, resData.accessToken, COOKIE_OPTIONS);
          return true;
        })
        .catch((err)=>{
          console.log(err);
          return false;
        })
    }
    return renewed;
  }

  /**
   * Retrieves the user's JWT accessToken from cookies
   * @returns JWT access token
   */
  const getAccessToken = () => {
    return cookies.accessToken;
  }

  /**
   * Saves provided values to cookies
   * @param {*} accessToken : JWT user access token
   * @param {*} refreshToken : JWT user refresh token
   * @param {*} userId 
   * @param {*} username 
   * @param {*} password 
   * @param {*} firstName 
   * @param {*} email 
   */
  const setCookies = (
    accessToken,
    refreshToken,
    userId,
    username,
    password,
    firstName,
    email
  ) => {
    setCookie(ACCESS_TOKEN_KEY, accessToken, COOKIE_OPTIONS);
    setCookie(REFRESH_TOKEN_KEY, refreshToken, COOKIE_OPTIONS);
    setCookie(USER_ID_KEY, userId, COOKIE_OPTIONS);
    setCookie(USERNAME_KEY, username, COOKIE_OPTIONS);
    setCookie(PASSWORD_KEY, password, COOKIE_OPTIONS);
    setCookie(FIRST_NAME_KEY, firstName, COOKIE_OPTIONS);
    setCookie(EMAIL_KEY, email, COOKIE_OPTIONS);
  };

  /**
   * Empties all cookies stored by the application
   */
  const clearCookies = useCallback(() => {
    const options = { path: "/" };
    removeCookie(ACCESS_TOKEN_KEY, options);
    removeCookie(REFRESH_TOKEN_KEY, options);
    removeCookie(USER_ID_KEY, options);
    removeCookie(USERNAME_KEY, options);
    removeCookie(PASSWORD_KEY, options);
    removeCookie(FIRST_NAME_KEY, options);
    removeCookie(EMAIL_KEY, options);
  }, [removeCookie]);

  useEffect(() => {
    if (authenticated) {
      // set callback to refresh token
      let authExpirySecs = decodeToken(cookies.accessToken).exp;
      console.log(authExpirySecs);
      let millisToExpiry = authExpirySecs * 1000 - Date.now();
      const timer = setTimeout(() => {
        alert("Access token expired");
      }, millisToExpiry);
      return () => clearTimeout(timer);
    } else {
      clearCookies();
      return () => {};
    }
  }, [clearCookies, cookies.accessToken, authenticated]);

  return (
    <Router>
      <Navbar authenticated={authenticated} onLogout={onLogout} />
      <AppContentContainer>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {authenticated ? (
            <Route
              path="/quiz"
              element={
                <Quiz userId={userId} getAccessToken={getAccessToken} renewAccessToken={renewAccessToken} />
              }
            />
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
        </Routes>
      </AppContentContainer>
    </Router>
  );
}

export default App;
