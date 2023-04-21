import React from "react";
import { useState, useEffect } from "react";
import {
  ProfileContainer,
  DivLine,
  ErrorLabel,
  Button,
  ProfileScrollContainer,
  VerticalScrollContainer,
  ProfileOuterContainer,
} from "../StyledElements.js";
import { API_URL } from "../App.js";
import {
  GetSessionUserId,
  GetSessionPassword,
  GetSessionAccessToken,
} from "../Storage.js";
import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "./signup.js";

function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    try {
      fetch(API_URL + "/profile/" + GetSessionUserId()).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          if (data != null) setUsername(data.userName);
          setName(data.firstName + " " + data.lastName);
          setEmail(data.email);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [username, email]);

  const handleSubmitUsername = async () => {
    if (newUsername.length < MIN_USERNAME_LENGTH) {
      setErrorText(
        `Username must be at least ${MIN_USERNAME_LENGTH} characters in length`
      );
    } else if (newUsername.length > MAX_USERNAME_LENGTH) {
      setErrorText(
        `Username must not be greater than ${MAX_USERNAME_LENGTH} characters in length`
      );
    } else {
      try {
        let res = await fetch(API_URL + "/profile/" + GetSessionUserId(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GetSessionAccessToken(),
          },
          body: JSON.stringify({
            userName: newUsername,
            old_password: GetSessionPassword(),
          }),
        });
        if (res.status === 200) {
          setUsername(newUsername);
          setShowUsernameInput(false);
        } else {
          setErrorText("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitEmail = async () => {
    console.log(newUsername);
    try {
      let res = await fetch(API_URL + "/profile/" + GetSessionUserId(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + GetSessionAccessToken(),
        },
        body: JSON.stringify({
          email: newEmail,
          old_password: GetSessionPassword(),
        }),
      });
      if (res.status === 200) {
        setShowEmailInput(false);
        setEmail(newEmail);
      } else {
        setErrorText("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ChangeUsername = () => (
    <DivLine>
      <h4>New username: </h4>
      <input
        type="text"
        value={newUsername}
        onChange={(event) => setNewUsername(event.target.value)}
        autoFocus
      />
      <Button onClick={() => handleSubmitUsername()}>Submit</Button>
    </DivLine>
  );

  const ChangeEmail = () => (
    <DivLine>
      <h4>New email: </h4>
      <input
        type="text"
        value={newEmail}
        onChange={(event) => setNewEmail(event.target.value)}
        autoFocus
      />
      <Button onClick={() => handleSubmitEmail()}>Submit</Button>
    </DivLine>
  );

  return (
    <ProfileOuterContainer>
      <ProfileContainer>
        <DivLine>
          <span>Name: {name}</span>
        </DivLine>

        <DivLine>
          <span>Username: <b>{username}</b></span>
          <Button
            type="button"
            onClick={() => setShowUsernameInput(!showUsernameInput)}
          >
            Change
          </Button>
        </DivLine>
        {showUsernameInput ? <ChangeUsername /> : null}

        <DivLine>
          <span>Email: <b>{email}</b></span>
          <Button
            type="button"
            onClick={() => setShowEmailInput(!showEmailInput)}
          >
            Change
          </Button>
        </DivLine>
        {showEmailInput ? <ChangeEmail /> : null}

        <ErrorLabel>{errorText}</ErrorLabel>
      </ProfileContainer>
    </ProfileOuterContainer>
  );
}

export default Profile;
