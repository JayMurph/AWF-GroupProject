import React from 'react';
import { useState } from 'react';
import { ImageBox, Username, ScoreTable, RecentScoreList} from "../StyledElements.js";

function AccountMain() {
  const [username, setUsername] = useState();
  const [highest, setHighest] = useState();
  const [avarage, setAvarage] = useState();
  const [total, setTotal] = useState();
  const [recentScores, setRecentScores] = useState([10]);


  try {
    fetch("https:/127.0.0.1/3000/profile").then(
      res => {
        if (res.status !== 200) {
          return;
        }
        res.json().then(data => {
          if (data != null)
          setUsername(data.userName);
          setHighest(data.hightestScore);
          setAvarage(data.scoreAvarage);
          setTotal(data.totalScore);
          setRecentScores(data.recentScores);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }


    return (
      <> 
        <ImageBox>
        <img src={"avatar.png"}  width = "200" height= "230" alt="Avatar"></img>
        <Username>{username}</Username>
        </ImageBox> 

        <ScoreTable>
        <tbody>
          <tr>
            <td>{highest}</td>
            <td>{avarage}</td>
            <td>{total}</td>
          </tr>
           <tr>
            <th>Highest</th>
            <th>Avarage</th>
            <th>Total</th>
          </tr>
        </tbody>
        </ScoreTable>

        <RecentScoreList>
        <h4>Recent Scores</h4>
        <ol >
          <li>{ recentScores[0].finalScore }</li>
          <li>{ recentScores[1].finalScore }</li>
          <li>{ recentScores[2].finalScore }</li>
          <li>{ recentScores[3].finalScore }</li>
          <li>{ recentScores[4].finalScore }</li>
          <li>{ recentScores[5].finalScore }</li> 
          <li>{ recentScores[6].finalScore }</li> 
          <li>{ recentScores[7].finalScore }</li> 
          <li>{ recentScores[8].finalScore }</li> 
          <li>{ recentScores[9].finalScore }</li> 
        </ol> 
        </RecentScoreList>  
      </>
    );
  }
  
  export default AccountMain;