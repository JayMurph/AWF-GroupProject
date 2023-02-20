import React from "react";
import FormField from "./FormField";
import { FormButton, CenteredDiv, ButtonDiv, ErrorLabel} from "../StyledElements";
import ReactFormInputValidation from "react-form-input-validation";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: "",
        user_name: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      errors: {},
    };

    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      email: "required|email",
      user_name: "required|alpha_dash",
      password: "required|alpha_dash",
      first_name: "required|alpha",
      last_name: "required|alpha",
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
            name="email"
            fieldName="Email"
            type="email"
            fieldValue={this.state.fields.email}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.email ? this.state.errors.email : ""}
          </ErrorLabel>
          <FormField
            name="user_name"
            fieldName="User Name"
            type="text"
            fieldValue={this.state.fields.user_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.user_name ? this.state.errors.user_name : ""}
          </ErrorLabel>
          <FormField
            name="password"
            fieldName="Password"
            type="text"
            fieldValue={this.state.fields.password}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.password ? this.state.errors.password : ""}
          </ErrorLabel>
          <FormField
            name="first_name"
            fieldName="First Name"
            type="text"
            fieldValue={this.state.fields.first_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.first_name ? this.state.errors.first_name : ""}
          </ErrorLabel>
          <FormField
            name="last_name"
            fieldName="Last Name"
            type="text"
            fieldValue={this.state.fields.last_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.last_name ? this.state.errors.last_name : ""}
          </ErrorLabel>
          <ButtonDiv>
            <FormButton type="submit">Create</FormButton>
          </ButtonDiv>
        </form>
      </CenteredDiv>
    );
  }
}
