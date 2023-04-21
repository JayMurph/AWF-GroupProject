import React from "react";
import { useState } from "react";
import {
  ImageBox,
  Username,
  ScoreTable,
  RecentScoreList,
  AccountContainer,
  AccountMainLineContainer,
  AccountOuterContainer,
} from "../StyledElements.js";
import { GetSessionUserName } from "../Storage.js";

function AccountMain(props) {
  const [username] = useState(GetSessionUserName);

  return (
    <AccountOuterContainer>
      <AccountContainer>
        <AccountMainLineContainer>
          <ImageBox>
            <img
              src="/avatar.png"
              width="100%"
              height="100%"
              alt="Avatar"
            ></img>
            <Username>{username}</Username>
          </ImageBox>

          <ScoreTable>
            <tbody>
              <tr>
                <td>{props.highest}</td>
                <td>{props.average}</td>
                <td>{props.total}</td>
              </tr>
              <tr>
                <th>Highest</th>
                <th>Average</th>
                <th>Total</th>
              </tr>
            </tbody>
          </ScoreTable>
        </AccountMainLineContainer>

        <RecentScoreList>
          <h4>Recent Scores</h4>
          <ol>
            {props.recentScores != null
              ? props.recentScores.map((recentScore) => {
                  return <li>{recentScore.finalScore}</li>;
                })
              : ""}
          </ol>
        </RecentScoreList>
      </AccountContainer>
    </AccountOuterContainer>
  );
}

export default AccountMain;
