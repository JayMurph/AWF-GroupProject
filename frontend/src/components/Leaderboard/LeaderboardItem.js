import React from "react";
import {
  LeaderboardIndex,
  LeaderboardItemContainer,
  LeaderboardScore,
  LeaderboardUsername,
} from "../../StyledElements";
import { GetProfile } from "../../ApiCalls";

const MAX_SCORE = 10000;
const MIN_WIDTH_PERCENTAGE = 25;
const FOCUS_COLOR = "#E4D00A";

export default class LeaderboardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      timeStamp: props.timeStamp,
      score: props.score,
      idx: props.idx,
      username: "",
      giveFocus: props.giveFocus || false,
    };
    this.containerRef = React.createRef();
  }

  /**
   * Retrieves username to display
   */
  async componentDidMount() {
    // get username to display on item
    await GetProfile(this.state.userId)
      .then((res) => res.json())
      .then((profile) => this.setState({ username: profile.userName }))
      .catch((err) => console.log(err));
  }

  /**
   * Scrolls the leaderboard item to the top of its container
   */
  scrollItemToTop() {
    this.containerRef.current.scrollIntoView(true);
  }

  render() {
    let width = (this.state.score / MAX_SCORE) * 100;
    width = width < MIN_WIDTH_PERCENTAGE ? MIN_WIDTH_PERCENTAGE : width;

    return (
      <LeaderboardItemContainer
        ref={this.containerRef}
        style={{
          width: `${width}%`,
          background: this.state.giveFocus && FOCUS_COLOR,
        }}
      >
        <LeaderboardIndex> {this.state.idx} </LeaderboardIndex>
        <LeaderboardUsername> {this.state.username}</LeaderboardUsername>
        <LeaderboardScore> {this.state.score} </LeaderboardScore>
      </LeaderboardItemContainer>
    );
  }
}
