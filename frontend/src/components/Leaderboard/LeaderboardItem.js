import React from "react";
import { LeaderboardIndex, LeaderboardItemContainer, LeaderboardScore } from "../../StyledElements";

const MAX_SCORE = 8000;
const MIN_WIDTH_PERCENTAGE = 10;

export default class LeaderboardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      timeStamp: props.timeStamp,
      score: props.score,
      idx: props.idx,
    };
  }

  render() {
    let width = (this.state.score / MAX_SCORE) * 100;
    width = width < MIN_WIDTH_PERCENTAGE ? MIN_WIDTH_PERCENTAGE : width;
    return (
      <LeaderboardItemContainer style={{"width":`${width}%`, "alignSelf":"start"}}>
        <LeaderboardIndex>
            {this.state.idx}
        </LeaderboardIndex>
          <LeaderboardScore>{this.state.score}</LeaderboardScore> 
      </LeaderboardItemContainer>
    );
  }
}
