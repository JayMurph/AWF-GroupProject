import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Quiz from "./pages/quiz";
import { GetUserId, SaveUserData, ClearUserData } from "./Storage";
import { AppContentContainer } from "./StyledElements";
import Leaderboard from "./pages/leaderboard";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function IsAuthenticated() {
  return GetUserId() != null;
}

function App() {
  const [authenticated, setAuthenticated] = useState(IsAuthenticated);
  const [userId, setUserId] = useState(GetUserId);

  const onLogout = () => {
    setAuthenticated(false);
    setUserId(null);
    ClearUserData();
  };

  const onLogin = (userData) => {
    console.log("login");
    console.log(userData);
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
            <Route path="/quiz" element={<Quiz userId={userId} />} />
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
