import React from 'react';
import { useState } from 'react';
import { ImageBox, Username, ScoreTable, RecentScoreList} from "../StyledElements.js";
import {API_URL}  from '../App.js';
import { GetSessionUserId } from '../Storage.js';

function AccountMain() {
  const [username, setUsername] = useState();
  const [highest, setHighest] = useState();
  const [avarage, setAvarage] = useState();
  const [total, setTotal] = useState();
  const [recentScores, setRecentScores] = useState(null);


  try {
      fetch(API_URL + "/profile/" +  GetSessionUserId()).then(
      res => {
        if (res.status !== 200) {
          return;
        }
        res.json().then(data => {
          if (data != null)
          {
            setUsername(data.userName);
            setHighest(data.hightestScore);
            setAvarage(data.scoreAvarage);
            setTotal(data.totalScore);
            setRecentScores(data.recentScores);
          }
        })
      }
    );
  } catch (err) {
    console.log(err);
  }


    return (
      <> 
        <ImageBox>
        <img src="/avatar.png"  width = "200" height= "230" alt="Avatar"></img>
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
        {
          (recentScores != null) ? recentScores.map((recentScore) => {return <li>{recentScore.finalScore}</li>}) : ""
        } 
        </ol> 
        </RecentScoreList>  
      </>
    );
  }
  
  export default AccountMain;