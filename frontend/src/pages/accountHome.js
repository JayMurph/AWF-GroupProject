import React from "react";
import "../App.css";
import ProfileLayout from "../components/Navbar/profileLayout";
import { Routes, Route } from "react-router-dom";
import AccountMain from "./accountMain";
import Profile from "./accountProfile";
import ChangePassword from "./changePassword";
import { AccountContentContainer } from "../StyledElements";

function AccountHome() {
  return (
    <AccountContentContainer>
      <Routes>
        <Route path="/" element={<ProfileLayout />}>
          <Route exact path="/" element={<AccountMain />} />
          <Route path="/details" element={<Profile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </AccountContentContainer>
  );
}

export default AccountHome;
