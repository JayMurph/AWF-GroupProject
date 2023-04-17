import React from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Logout(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        props.onLogout();
        navigate("/");
    });
    return (<></>);
}