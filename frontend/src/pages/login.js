import React from "react";
import LoginForm from "../components/LoginForm.js";
import { PageHeader } from "../StyledElements.js";

const Login = () => {
  return (
    <>
      <PageHeader>Login</PageHeader>
      <LoginForm></LoginForm>
    </>
  );
};

export default Login;
