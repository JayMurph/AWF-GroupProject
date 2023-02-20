import React from 'react';
import LoginForm from '../components/LoginForm.js'

const Login = () => {
return (
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center'}}>Login</h1>
            <LoginForm></LoginForm>
        </div>
);
};

export default Login;
