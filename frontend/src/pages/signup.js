import React from 'react';
import SignupForm from '../components/SignupForm.js'

const SignUp = () => {
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center'}}>Create a New Account</h1>
            <SignupForm></SignupForm>
        </div>
    );
};

export default SignUp;
