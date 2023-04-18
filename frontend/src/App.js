import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import {
  GetSessionAccessToken,
  GetSessionUserId,
  GetSessionRefreshToken,
  ClearSessionData,
  SaveSessionData,
  GetSessionUserName,
  ClearSessionAccessToken,
  SetSessionAccessToken,
} from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";
import { decodeToken, isExpired } from "react-jwt";
import { LogoutUser, RenewAccessToken } from "./ApiCalls";
import Logout from "./pages/logout";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

/**
 * Indicates if the current user is authenticated
 * @returns boolean : True if user is currently authenticated, otherwise false
 */
function IsAuthenticated() {
  return GetSessionAccessToken() && !isExpired(GetSessionAccessToken());
}

/**
 * Verifies authentication access token as belonging to given user and saves them if
 * valid
 * @param {JWT} accessToken : token from login to backend
 * @param {JWT} refreshToken : token from login to backend
 * @param {string} userName : form login username
 * @param {string} password  : form login password
 * @returns True if accessToken is valid for given user and password
 */
function AuthenticateSession(accessToken, refreshToken, userName, password) {
  if (accessToken && refreshToken) {
    const dat = decodeToken(accessToken);
    if (userName === dat.userName && password === dat.password) {
      SaveSessionData(
        accessToken,
        refreshToken,
        dat.sub,
        dat.userName,
        dat.password,
        dat.firstName,
        dat.email
      );
      return dat.sub;
    }
    return false;
  }
}

/**
 * Contains main routes for the trivia site app. Handles user auth
 * @returns component
 */
function App() {
  const [authenticated, setAuthenticated] = useState(IsAuthenticated);
  const [userId, setUserId] = useState(GetSessionUserId);
  const navigate = useNavigate();

  const handleAuthentication = (
    accessToken,
    refreshToken,
    userName,
    password
  ) => {
    const result = AuthenticateSession(
      accessToken,
      refreshToken,
      userName,
      password
    );
    if (result === false) {
      setAuthenticated(false);
      ClearSessionData();
      return false;
    } else {
      setUserId(result);
      setAuthenticated(true);
      return true;
    }
  };

  /**
   * renews the user's access token and saves it back to storage
   * @returns boolean : true if access token was renewed, otherwise false
   */
  const renewAccessToken = async () => {
    let refreshToken = GetSessionRefreshToken();
    let renewed = false;
    if (GetSessionAccessToken() && refreshToken) {
      ClearSessionAccessToken();
      renewed = await RenewAccessToken(refreshToken)
        .then((res) => res.json())
        .then((authData) => {
          SetSessionAccessToken(authData.accessToken);
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
   * De-authorizes user, clears storage
   */
  const logout = async () => {
    try {
      let refreshToken = GetSessionRefreshToken();
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
   * Set window load callback to clear session data if user is no long
   * authenticated
   */
  useEffect(() => {
    window.addEventListener("load", (ev) => {
      if (!IsAuthenticated()) {
        ClearSessionData();
      }
    });
  });

  /**
   * Set timer to prompt user to re-login after certain period of time
   */
  useEffect(() => {
    if (authenticated) {
      // set callback to refresh token
      let authExpirySecs = decodeToken(GetSessionAccessToken()).exp;
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
          logout();
          navigate("/");
        }
      }, millisToExpiry);
      return () => clearTimeout(timer);
    } else {
      return () => {};
    }
  }, [authenticated, navigate]);

  return (
    <>
      <Navbar authenticated={authenticated} onLogout={logout} />
      <AppContentContainer>
        <Routes>
          {authenticated ? (
            <Route
              exact
              path="/"
              element={<Home userName={GetSessionUserName()} />}
            />
          ) : (
            <Route exact path="/" element={<Home />} />
          )}
          <Route path="/leaderboard" element={<Leaderboard />} />
          {authenticated ? (
            <>
              <Route
                path="/quiz"
                element={
                  <Quiz userId={userId} renewAccessToken={renewAccessToken} />
                }
              />
              <Route path="/logout" element={<Logout onLogout={logout} />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<Login onLogin={handleAuthentication} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
        </Routes>
      </AppContentContainer>
    </>
  );
}

export default App;
