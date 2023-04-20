import React from 'react';
import { useState } from 'react';
import { ProfileContainer, DivLine, ErrorLabel, Button} from "../StyledElements.js";
import {API_URL}  from '../App.js';
import { GetSessionUserId, GetSessionPassword, GetSessionAccessToken } from '../Storage.js';


function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [errorText, setErrorText] = useState("");

  
  try {
    fetch(API_URL + "/profile/" +  GetSessionUserId()).then(
      res => {
        if (res.status !== 200) {
          return;
        }
        res.json().then(data => {
          if (data != null)
          setUsername(data.userName);
          setName(data.firstName + " " + data.lastName);
          setEmail(data.email);
        })
      }
    );
  } catch (err) {
    console.log(err);
  }


  const handleSubmit =  async (stringValue) => {
    console.log(stringValue);
    console.log(GetSessionAccessToken()); 
    try {
      let res = await fetch(API_URL + "/profile/" +  GetSessionUserId(), {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": "Bearer " + GetSessionAccessToken()
        },
        body: JSON.stringify({
          stringValue  
        })
      });
      if (res.status === 200) {
        setErrorText("Updated successfully");
      } else {
        setErrorText("Some error occured");
      }
    } catch (err) {
      console.log(err);            
    }
  }; 


  const ChangeUsername = () => (
    <DivLine>
        <h4>New username: </h4>  
        <input
          type = "text"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
          autoFocus          
        />            
        <Button onClick={()=>handleSubmit("userName:" + newUsername + ", old_password:" + GetSessionPassword())}>Submit</Button>
    </DivLine>
  )  

  const ChangeEmail = () => (
    <DivLine>
        <h4>New email: </h4>  
        <input
          type = "text"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          autoFocus
        />            
        <Button onClick={()=>handleSubmit("email:" + newEmail + ", old_password:" + GetSessionPassword())}>Submit</Button>
    </DivLine>
  )  


  return (
    <>
      <ProfileContainer>
     
        <DivLine>    
          <span>Name: {name}</span>                       
        </DivLine>

        <DivLine>       
          <span>Username: {username}</span>                       
          <button type="button" onClick={()=>setShowUsernameInput(!showUsernameInput)}>Change</button>
        </DivLine>
        { showUsernameInput ? <ChangeUsername /> : null }

        <DivLine>       
          <span>Email: {email}</span>                         
          <button type="button" onClick={()=>setShowEmailInput(!showEmailInput)}>Change</button>       
        </DivLine>
        { showEmailInput ? <ChangeEmail /> : null }

        <ErrorLabel>{errorText}</ErrorLabel>
      
      </ProfileContainer>     
    </>
  );
}

export default Profile;