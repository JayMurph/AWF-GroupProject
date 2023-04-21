import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm.js";
import { ErrorLabel, NoBreakScrollDiv, PageHeader, LoadingLabel} from "../StyledElements.js";
import { SignUpUser } from "../ApiCalls.js";

export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 12;
export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 12;

function SignUp(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

    setErrorText("");
    setLoading(true);
    SignUpUser(
      fields.email,
      fields.user_name,
      fields.password,
      fields.first_name,
      fields.last_name,
      fields.birth_date
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUserData(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorText("Unable to create a new account!");
      });
  };

  return (
    <NoBreakScrollDiv>
      <PageHeader>Create a New Account</PageHeader>
      <SignupForm onSubmit={formSubmit}></SignupForm>
      <ErrorLabel>{errorText}</ErrorLabel>
      {loading && <LoadingLabel>Loading...</LoadingLabel>}
    </NoBreakScrollDiv>
  );
}

export default SignUp;
