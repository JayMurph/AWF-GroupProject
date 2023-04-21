import React, {useState, useEffect} from "react";
import "../App.css";
import ProfileLayout from "../components/Navbar/profileLayout";
import { Routes, Route } from "react-router-dom";
import AccountMain from "./accountMain";
import Profile from "./accountProfile";
import ChangePassword from "./changePassword";
import { AccountContentContainer } from "../StyledElements";
import { API_URL } from "../App";
import { GetSessionUserId } from "../Storage";

function AccountHome() {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    try {
      fetch(API_URL + "/profile/" + GetSessionUserId()).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setFullName(data.firstName + " " + data.lastName);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [fullName]);

  return (
    <AccountContentContainer>
      <Routes>
        <Route path="/" element={<ProfileLayout />}>
          <Route exact path="/" element={<AccountMain />} />
          <Route path="/details" element={<Profile fullName={fullName}/>} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </AccountContentContainer>
  );
}

export default AccountHome;
