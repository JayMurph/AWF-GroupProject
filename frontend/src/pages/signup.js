import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm.js";
import { CenteredDiv, PageHeader } from "../StyledElements.js";
import SignUpUser from "../ApiCalls.js";

function SignUp(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      props.onSignupSuccess(userData);
      navigate("/");
    }
  }, [userData, props, navigate]);

  const formSubmit = (fields) => {
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
      .catch((err) => setErrorText(err));
  };

  return (
    <>
      <PageHeader>Create a New Account</PageHeader>
      <SignupForm onSubmit={formSubmit}></SignupForm>
      <CenteredDiv>{errorText}</CenteredDiv>
    </>
  );
}

export default SignUp;
