import React from 'react';
import SignupForm from '../components/SignupForm.js'
import { PageHeader } from '../StyledElements.js';

const SignUp = () => {
    return (
        <>
            <PageHeader>Create a New Account</PageHeader>
            <SignupForm></SignupForm>
        </>
    );
};

export default SignUp;
