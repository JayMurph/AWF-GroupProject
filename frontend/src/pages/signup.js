import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm.js";
import {
  ErrorLabel,
  NoBreakScrollDiv,
  PageHeader,
} from "../StyledElements.js";
import { SignUpUser } from "../ApiCalls.js";

function SignUp(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      navigate("/login", { state: { userName: userData.userName } });
    }
  }, [userData, props, navigate]);

  const formSubmit = (fields) => {
    if (fields.password_confirm !== fields.password) {
      setErrorText("Error: Passwords do not match!");
      return;
    }

    SignUpUser(
      fields.email,
      fields.user_name,
      fields.password,
      fields.first_name,
      fields.last_name,
      fields.birth_date
    )
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => {
        console.log(err);
        setErrorText("Unable to create a new account!");
      });
  };

  return (
    <NoBreakScrollDiv>
      <PageHeader>Create a New Account</PageHeader>
      <SignupForm onSubmit={formSubmit}></SignupForm>
      <ErrorLabel>{errorText}</ErrorLabel>
    </NoBreakScrollDiv>
  );
}

export default SignUp;
