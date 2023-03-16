import React from 'react';

function AccountMain(props) {

    return (
      <>
        <img src={props.avatar} style={"width:200px; border-radius: 50%"}></img>
        
        <div id="changeAvatar"></div>         
        
        <h2>Username: {props.username}</h2>
  
        <h2>Rank: {props.rank}</h2>
  
        <h2>Avarage: {props.Height}</h2>
        
        <h2>Total: {props.Height}</h2>

        <h2>Recent scores</h2>
        
      </>
    );
  }
  
  export default AccountMain;