import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm.js";
import { PageHeader, ErrorLabel } from "../StyledElements.js";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginUser } from "../ApiCalls.js";

const Login = (props) => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [loginData, setLoginData] = useState(null);
  const location = useLocation();
  const userName = location.state?.userName ?? "";

  useEffect(() => {
    if (loginData) {
      if (props.onLogin(loginData.accessToken, loginData.refreshToken, loginData.userName, loginData.password)) {
        navigate("/");
      }
      else {
        setErrorText("Unable to Login!");
      }
    }
  }, [loginData, props, navigate, userName]);

  const formSubmit = (fields) => {
    LoginUser(fields.username, fields.password)
      .then((res) => res.json())
      .then((authRes) =>
        setLoginData({
          accessToken: authRes.accessToken,
          refreshToken: authRes.refreshToken,
          userName: fields.username,
          password: fields.password,
        })
      )
      .catch((err) => {
        console.log(err);
        setErrorText("Unable to Login!");
      });
  };

  return (
    <>
      <PageHeader>Login</PageHeader>
      <LoginForm onSubmit={formSubmit} username={userName}></LoginForm>
      <ErrorLabel>{errorText}</ErrorLabel>
    </>
  );
};

export default Login;
