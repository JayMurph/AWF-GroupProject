import React from "react";
import { useState, useEffect } from "react";
import {
  ProfileContainer,
  DivLine,
  ErrorLabel,
  Button,
  ProfileOuterContainer,
} from "../StyledElements.js";
import { API_URL } from "../App.js";
import {
  GetSessionUserId,
  GetSessionPassword,
  GetSessionAccessToken,
  SetSessionEmail,
  SetsessionUsername,
} from "../Storage.js";
import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "./signup.js";
import { useFormInputValidation } from "react-form-input-validation";

function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [usernameFields, usernameErrors, usernameForm] = useFormInputValidation(
    {
      username: "",
    },
    {
      username: `required|alpha_dash|between:${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}`,
    }
  );

  const [emailFields, emailErrors, emailForm] = useFormInputValidation(
    {
      email: "",
    },
    {
      email: "required|email",
    }
  );

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

  const handleSubmitUsername = async (event) => {
    const isValid = await usernameForm.validate(event);
    if (isValid) {
      try {
        let res = await fetch(API_URL + "/profile/" + GetSessionUserId(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GetSessionAccessToken(),
          },
          body: JSON.stringify({
            userName: usernameFields.username,
            old_password: GetSessionPassword(),
          }),
        });
        if (res.status === 200) {
          SetsessionUsername(usernameFields.username);
          setUsername(usernameFields.username);
          setShowUsernameInput(false);
        } else {
          setErrorText("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitEmail = async (event) => {
    const isValid = await emailForm.validate(event);
    if (isValid) {
      try {
        let res = await fetch(API_URL + "/profile/" + GetSessionUserId(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GetSessionAccessToken(),
          },
          body: JSON.stringify({
            email: emailFields.email,
            old_password: GetSessionPassword(),
          }),
        });
        if (res.status === 200) {
          SetSessionEmail(emailFields.email);
          setEmail(emailFields.email);
          setShowEmailInput(false);
        } else {
          setErrorText("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ProfileOuterContainer>
      <ProfileContainer>
        <DivLine>
          <span style={{wordBreak:"break-all"}}>
            Name: <b>{name}</b>
          </span>
        </DivLine>

        <DivLine>
          <span style={{wordBreak:"break-all"}}>
            Username: <b>{username}</b>
          </span>
          <Button onClick={() => setShowUsernameInput(!showUsernameInput)}>
            Change
          </Button>
        </DivLine>
        {showUsernameInput && (
          <>
            <DivLine>
              <h4>New username: </h4>
              <form
                className="usernameForm"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitUsername}
              >
                <input
                  type="text"
                  name="username"
                  onBlur={usernameForm.handleBlurEvent}
                  onChange={usernameForm.handleChangeEvent}
                  value={usernameFields.username}
                />
                <Button type="submit">Submit</Button>
              </form>
            </DivLine>
            <ErrorLabel style={{textAlign:"center"}}>
              {usernameErrors.username ? usernameErrors.username : ""}
            </ErrorLabel>
          </>
        )}

        <DivLine>
          <span style={{wordBreak:"break-all"}}>
            Email: <b>{email}</b>
          </span>
          <Button onClick={() => setShowEmailInput(!showEmailInput)}>
            Change
          </Button>
        </DivLine>
        {showEmailInput && (
          <>
            <DivLine>
              <h4>New email: </h4>
              <form
                className="emailForm"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitEmail}
              >
                <input
                  type="text"
                  name="email"
                  onChange={emailForm.handleChangeEvent}
                  onBlur={emailForm.handleBlurEvent}
                  value={emailFields.email}
                />
                <Button type="submit">Submit</Button>
              </form>
            </DivLine>
            <ErrorLabel style={{textAlign:"center"}}>
              {emailErrors.email ? emailErrors.email : ""}
            </ErrorLabel>
          </>
        )}

        <ErrorLabel style={{textAlign:"center"}}>{errorText}</ErrorLabel>
      </ProfileContainer>
    </ProfileOuterContainer>
  );
}

export default Profile;
