import React from "react";
import FormField from "./FormField";
import { FormButton, CenteredDiv, ButtonDiv, ErrorLabel} from "../StyledElements";
import ReactFormInputValidation from "react-form-input-validation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        user_name: "",
        password: "",
      },
      errors: {},
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      user_name: "required",
      password: "required",
    });
    this.form.onformsubmit = (fields) => {
      console.log(fields);
    };
  }

  render() {
    return (
      <CenteredDiv>
        <form onSubmit={this.form.handleSubmit}>
          <FormField
            fieldName="User Name"
            type="text"
            name="user_name"
            fieldValue={this.state.fields.user_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.user_name ? this.state.errors.user_name : ""}
          </ErrorLabel>
          <FormField
            fieldName="Password"
            type="password"
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
