import React from 'react';
import FormField from './FormField';
import Styles from '../styles.module.css';
import {FormButton, CenteredDiv, ButtonDiv} from '../StyledElements';

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        email:'',
        userName:'',
        password:'',
        firstName:'',
        lastName:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <CenteredDiv>
        <form onSubmit={this.handleSubmit} >
          <FormField fieldName={'Email'} fieldValue={this.state.email} onChangeCB={(e)=>this.setState({email:e.target.value})}/>
          <FormField fieldName={'User Name'} fieldValue={this.state.userName} onChangeCB={(e)=>this.setState({userName:e.target.value})}/>
          <FormField fieldName={'Password'} fieldValue={this.state.password} onChangeCB={(e)=>this.setState({password:e.target.value})}/>
          <FormField fieldName={'First Name'} fieldValue={this.state.firstName} onChangeCB={(e)=>this.setState({firstName:e.target.value})}/>
          <FormField fieldName={'Last Name'} fieldValue={this.state.lastName} onChangeCB={(e)=>this.setState({lastName:e.target.value})}/>
          <ButtonDiv>
              <FormButton type="submit" className={Styles.FormButton}>Create</FormButton>
          </ButtonDiv>
        </form>
      </CenteredDiv>
    );
  }
}