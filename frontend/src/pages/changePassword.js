import { useState } from "react";
import {
  FormTextbox,
  PadLabel,
  ErrorLabel,
  Button,
  ChangePasswordForm,
  ButtonDiv,
} from "../StyledElements.js";
import { API_URL } from "../App.js";
import {
  GetSessionUserId,
  GetSessionPassword,
  GetSessionAccessToken,
  SetSessionPassword,
} from "../Storage.js";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "./signup.js";
import { useFormInputValidation } from "react-form-input-validation";

function ChangePassword() {
  const [errorText, setErrorText] = useState("");

  const [fields, errors, form] = useFormInputValidation(
    {
      password: "",
      password_confirm: "",
    },
    {
      password: `required|alpha_dash|between:${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}`,
      password_confirm: `required|alpha_dash|between:${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}`,
    }
  );

  const handleSubmit = async (event) => {
    const isValid = await form.validate(event);
    if (isValid && fields.password !== fields.password_confirm) {
      setErrorText("Passwords are inconsistent");
    } else if (isValid) {
      try {
        let res = await fetch(API_URL + "/profile/" + GetSessionUserId(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GetSessionAccessToken(),
          },
          body: JSON.stringify({
            old_password: GetSessionPassword(),
            new_password: fields.password,
          }),
        });
        if (res.status === 200) {
          setErrorText("Updated successfully");
          SetSessionPassword(fields.password);
        } else {
          setErrorText("Some error occured");
        }
      } catch (err) {
        console.log(err);
        setErrorText("Some error occured");
      }
    }
  };

  return (
    <ChangePasswordForm
      className="passwordForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <PadLabel>New password:</PadLabel>
      <FormTextbox
        type="password"
        name="password"
        value={fields.password}
        onChange={form.handleChangeEvent}
        onBlur={form.handleBlurEvent}
      />
      <ErrorLabel>{errors.password ? errors.password : ""}</ErrorLabel>
      <PadLabel>Confirm:</PadLabel>
      <FormTextbox
        type="password"
        name="password_confirm"
        value={fields.password_confirm}
        onBlur={form.handleBlurEvent}
        onChange={form.handleChangeEvent}
      />
      <ErrorLabel>
        {errors.password_confirm ? errors.password_confirm : ""}
      </ErrorLabel>
      <ButtonDiv>
        <Button type="submit">Change</Button>
      </ButtonDiv>
      <ErrorLabel>{errorText}</ErrorLabel>
    </ChangePasswordForm>
  );
}

export default ChangePassword;
