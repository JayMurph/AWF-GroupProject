import { useState } from 'react';

function ChangePassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = () => {
    if (password1.length <= 6 || password2.length <= 6) {
        document.getElementById("error").value="Invalid input!"
    }
    else if(password1 == password2){
        
    }
    else{
        document.getElementById("error").value="Inconsistent inputs!"
    }   
  };

  return (
    <>
      <label>New password:</label>
      <input
          type="text" 
          value={password1}
          onChange={(event) => setPassword1(event.target.value)}
      />
      
      <label>Confirm:</label>
      <input
          type="text" 
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
      />

      <button type="button" onClick={handleSubmit}>Change</button>            

      <p id="error"></p>
    </>
  );
}

export default ChangePassword;