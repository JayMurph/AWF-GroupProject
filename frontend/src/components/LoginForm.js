import React from 'react';
import FormField from './FormField';
import {FormButton, CenteredDiv, ButtonDiv} from '../StyledElements'

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userName:'',
			password:''
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
				<FormField fieldName={'User Name'} fieldValue={this.state.userName} onChangeCB={(e)=>this.setState({userName:e.target.value})}/>
				<FormField fieldName={'Password'} fieldValue={this.state.password} onChangeCB={(e)=>this.setState({password:e.target.value})}/>
				<ButtonDiv>
					<FormButton type="submit">Login</FormButton>
				</ButtonDiv>
				</form>
			</CenteredDiv>
		);
	}
}