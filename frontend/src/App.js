import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import {
  GetSessionAccessToken,
  GetSessionUserId,
  GetSessionRefreshToken,
  ClearSessionData,
  SetSessionAccessToken,
  SaveSessionData,
} from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";
import { decodeToken, isExpired } from "react-jwt";
import { LogoutUser, RenewAccessToken } from "./ApiCalls";
import Logout from "./pages/logout";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function isAuthenticated() {
  return GetSessionAccessToken() && !isExpired(GetSessionAccessToken());
}

/**
 * Contains main routes for the trivia site app. Handles user auth
 * @returns component
 */
function App() {
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());
  const [userId, setUserId] = useState(GetSessionUserId());
  const [privateAccessToken, setPrivateAccessToken] = useState(
    GetSessionAccessToken()
  );
  const navigate = useNavigate();

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
      setPrivateAccessToken(tokens.accessToken);
      setAuthenticated(true);
    }
  };

  /**
   * Callback for user logging out. De-authorizes user, clears storage
   */
  const onLogout = async () => {
    try {
      let refreshToken = GetSessionRefreshToken();
      if (refreshToken) {
        await LogoutUser(refreshToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticated(false);
      setPrivateAccessToken(null);
      ClearSessionData();
    }
  };

  /**
   * renews the user's access token and saves it back to storage
   * @returns boolean : true if access token was renewed, otherwise false
   */
  const renewAccessToken = async () => {
    let accessToken = GetSessionAccessToken();
    let refreshToken = GetSessionRefreshToken();
    let renewed = false;
    if (accessToken && refreshToken) {
      renewed = await RenewAccessToken(refreshToken)
        .then((res) => res.json())
        .then((resData) => {
          SetSessionAccessToken(resData.accessToken);
          setPrivateAccessToken(resData.accessToken);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
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
    if (authenticated && privateAccessToken) {
      // set callback to refresh token
      let authExpirySecs = decodeToken(privateAccessToken).exp;
      let millisToExpiry = authExpirySecs * 1000 - Date.now();
      const timer = setTimeout(async () => {
        let shouldRenew = await swal({
          title: "Stay logged in?",
          text: "You have been away for a bit. Would you like to stay logged in?",
          buttons: ["No", "Yes"],
        });
        let renewed = false;
        if (shouldRenew) {
          renewed = await renewAccessToken();
        }
        if (!renewed) {
          onLogout();
          navigate("/");
        }
      }, millisToExpiry);
      return () => clearTimeout(timer);
    } else {
      return () => {};
    }
  }, [authenticated, privateAccessToken, navigate]);

  return (
    <>
      <Navbar authenticated={authenticated} onLogout={onLogout} />
      <AppContentContainer>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {authenticated ? (
            <>
              <Route
                path="/quiz"
                element={
                  <Quiz userId={userId} renewAccessToken={renewAccessToken} />
                }
              />
              <Route path="/logout" element={<Logout onLogout={onLogout} />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
        </Routes>
      </AppContentContainer>
    </>
  );
}

export default App;
