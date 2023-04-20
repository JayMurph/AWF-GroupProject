import React from 'react';
import { useState } from 'react';
import { ProfileContainer, DivLine, ErrorLabel, Button} from "../StyledElements.js";
import {API_URL}  from '../App.js';
import { GetSessionUserId, GetSessionAccessToken } from '../Storage.js';


function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [errorText, setErrorText] = useState("");

  try {
    fetch(API_URL + "/profile/" +  GetSessionUserId).then(
      res => {
        if (res.status !== 200) {
          return;
        }
        res.json().then(data => {
          if (data != null)
          setUsername(data.userName);
          setName(data.name);
          setEmail(data.email);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }


  const handleSubmit =  async (e, stringValue) => {
    e.preventDefault();
    try {
      let res = await fetch(API_URL + "/profile/" +  GetSessionUserId, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": "Bearer " + GetSessionAccessToken
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


  const ChangeName = () => (
    <DivLine>
        <h4>New name: </h4>  
        <input
          type = "text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />            
        <Button onClick={()=>handleSubmit("name:" + newName)}>Submit</Button>
    </DivLine>
  ) 
  
  const ChangeUsername = () => (
    <DivLine>
        <h4>New username: </h4>  
        <input
          type = "text"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />            
        <Button onClick={()=>handleSubmit("userName:"+ newUsername)}>Submit</Button>
    </DivLine>
  )  

  const ChangeEmail = () => (
    <DivLine>
        <h4>New email: </h4>  
        <input
          type = "text"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />            
        <Button onClick={()=>handleSubmit("email:" + newEmail)}>Submit</Button>
    </DivLine>
  )  


  return (
    <>
      <ProfileContainer>
     
        <DivLine>    
          <span>Name: {name}</span>                       
          <button type="button" onClick={()=>setShowNameInput(!showNameInput)}>Change</button>
        </DivLine>
        { showNameInput ? <ChangeName /> : null }

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