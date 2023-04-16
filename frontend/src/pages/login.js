import React, {useEffect, useState} from "react";
import LoginForm from "../components/LoginForm.js";
import { PageHeader, ErrorLabel } from "../StyledElements.js";
import {useNavigate, useLocation } from "react-router-dom";
import {LoginUser} from "../ApiCalls.js";

const Login = (props) => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [tokens, setTokens] = useState(null);
  const location = useLocation();
  const username = location.state?.username ?? "";

  useEffect(() => {
    if (tokens) {
      props.onLogin(tokens);
      navigate("/");
    }
  }, [tokens, props, navigate]);

  const formSubmit = (fields) => {
    LoginUser(fields.username, fields.password)
      .then((res)=>res.json())
      .then((tokens)=>setTokens(tokens))
      .catch((err)=> {
        console.log(err);
        setErrorText("Unable to Login!");
      })
  };

  return (
    <>
      <PageHeader>Login</PageHeader>
      <LoginForm onSubmit={formSubmit} username={username}></LoginForm>
      <ErrorLabel>{errorText}</ErrorLabel>
    </>
  );
};

export default Login;
