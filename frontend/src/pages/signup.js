import React from "react";
import SignupForm from "../components/SignupForm.js";
import { PageHeader } from "../StyledElements.js";

const SignUp = () => {
  const formSubmit = (fields) => {
    console.log(fields);
    //SignUp(
    //  fields.email,
    //  fields.username,
    //  fields.password,
    //  fields.first_name,
    //  fields.last_name,
    //  fields.birth_date
    //)
    //.then((res)=>console.log(res))
    //.catch((err)=>console.log(err))
  };

  return (
    <>
      <PageHeader>Create a New Account</PageHeader>
      <SignupForm onSubmit={formSubmit}></SignupForm>
    </>
  );
};

export default SignUp;
