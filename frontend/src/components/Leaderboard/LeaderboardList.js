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
          <ul>
            {this.state.initialItems.map((hs) => {
              return (
                <>
                  <p>
                    {hs.userId} {hs.finalScore} {hs.timeStamp}
                  </p>
                </>
              );
            })}
          </ul>
        </CenteredDiv>
      </>
    );
  }
}
