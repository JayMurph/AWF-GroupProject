import React, {useEffect, useState} from "react";
import LoginForm from "../components/LoginForm.js";
import { PageHeader, ErrorLabel } from "../StyledElements.js";
import {useNavigate, useLocation } from "react-router-dom";
import {LoginUser} from "../ApiCalls.js";

const Login = (props) => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  console.log(location);
  const username = location.state?.username ?? "";

  useEffect(() => {
    if (userData) {
      props.onLogin(userData);
      navigate("/");
    }
  }, [userData, props, navigate]);

  const formSubmit = (fields) => {
    LoginUser(fields.username, fields.password)
      .then((res)=>res.json())
      .then((data)=>setUserData(data))
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
