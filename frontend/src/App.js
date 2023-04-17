import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import {
  GetAccessToken,
  GetUserId,
  GetRefreshToken,
  ClearSessionData,
  SetAccessToken,
  SaveSessionData,
} from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";
import { decodeToken, isExpired } from "react-jwt";
import { LogoutUser, RenewAccessToken } from "./ApiCalls";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function isAuthenticated() {
  return GetAccessToken() && !isExpired(GetAccessToken());
}

/**
 * Contains main routes for the trivia site app. Handles user auth
 * @returns component
 */
function App() {
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());
  const [userId, setUserId] = useState(GetUserId());

  /**
   * callback for user logging in. Saves user info to storage and sets user as
   * authenticated
   * @param {*} tokens : contains JWT accessToken and refreshToken fields
   */
  const onLogin = async (tokens) => {
    if (tokens) {
      const dt = decodeToken(tokens.accessToken);
      SaveSessionData(
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
   * Callback for user logging out. De-authorizes user, clears storage
   */
  const onLogout = async () => {
    try {
      let refreshToken = GetRefreshToken();
      if (refreshToken) {
        await LogoutUser(refreshToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticated(false);
      ClearSessionData();
    }
  };

  /**
   * renews the user's access token and saves it back to cookies
   * @returns boolean : true if access token was renewed, otherwise false
   */
  const renewAccessToken = async () => {
    let accessToken = GetAccessToken();
    let refreshToken = GetRefreshToken();
    let renewed = false;
    if (accessToken && refreshToken) {
      renewed = await RenewAccessToken(refreshToken)
        .then((res) => res.json())
        .then((resData) => {
          SetAccessToken(resData.accessToken);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });

      if (renewed) {
        // set new timer for refreshing access token
      }
    }
    return renewed;
  };

  /**
   * Retrieves the user's JWT accessToken from storage
   * @returns JWT access token
   */
  //const getAccessToken = () => {
  //  return GetAccessToken();
  //}

  useEffect(() => {
    if (authenticated) {
      // set callback to refresh token
      let accessToken = GetAccessToken();
      let authExpirySecs = decodeToken(accessToken).exp;
      console.log(authExpirySecs);
      let millisToExpiry = authExpirySecs * 1000 - Date.now();
      const timer = setTimeout(() => {
        alert("Access token expired");
        // blah
      }, millisToExpiry);
      return () => clearTimeout(timer);
    } else {
      return () => {};
    }
  }, [authenticated]);

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
                <Quiz userId={userId} renewAccessToken={renewAccessToken} />
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
