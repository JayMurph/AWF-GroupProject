import React from "react";
import FormField from "./FormField";
import { FormButton, CenteredDiv, ButtonDiv, ErrorLabel} from "../StyledElements";
import ReactFormInputValidation from "react-form-input-validation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        username: props.username,
        password: "",
      },
      errors: {},
      onSubmit:props.onSubmit

    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      username: "required",
      password: "required",
    });
    this.form.onformsubmit = props.onSubmit;
  }

  render() {
    return (
      <CenteredDiv>
        <form onSubmit={this.form.handleSubmit}>
          <FormField
            fieldName="User Name"
            type="text"
            name="username"
            fieldValue={this.state.fields.username}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.username ? this.state.errors.username : ""}
          </ErrorLabel>
          <FormField
            fieldName="Password"
            type="text"
            name="password"
            fieldValue={this.state.fields.password}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.password ? this.state.errors.password : ""}
          </ErrorLabel>
          <ButtonDiv>
            <FormButton type="submit">Login</FormButton>
          </ButtonDiv>
        </form>
      </CenteredDiv>
    );
  }
}
