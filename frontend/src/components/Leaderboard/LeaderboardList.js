import React from "react";
import { CenteredDiv } from "../../StyledElements";

export default class LeaderboardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardEndpoint: props.leaderboardEndpoint,
      initialItems: props.initialItems,
    };
  }

  render() {
    return (
      <>
        <CenteredDiv>
          <table style={{"width":"70%"}}>
            <tr>
              <th style={{"width":"20%"}}>User</th>
              <th style={{"width":"20%"}}>Score</th>
              <th style={{"width":"20%"}}>Time</th>
            </tr>
            {this.state.initialItems.map((hs) => {
              return (
                  <tr>
                    <td style={{"textAlign":"center"}}>
                      {hs.userId} 
                    </td>
                    <td style={{"textAlign":"center"}}>
                      {hs.finalScore} 
                    </td>
                    <td style={{"textAlign":"center"}}>
                      {hs.timeStamp}
                    </td>
                  </tr>
              );
            })}
          </table>
        </CenteredDiv>
      </>
    );
  }
}
