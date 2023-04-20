import React from "react";
import {
  LeaderboardIndex,
  LeaderboardItemContainer,
  LeaderboardScore,
  LeaderboardUsername,
} from "../../StyledElements";
import { GetProfile } from "../../ApiCalls";

const MAX_SCORE = 10000;

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

  /**
   * Creates appropriate class names for the CSS LeaderboardItem given its current state
   * @returns String containing class names for the CSS LeaderboardItem
   */
  getItemClassNames() {
    let classNames = "leaderboardItem";

    switch (this.state.idx) {
      case 1:
        classNames += "One";
        break;
      case 2:
        classNames += "Two";
        break;
      case 3:
        classNames += "Three";
        break;
      case 4:
        classNames += "Four";
        break;
      case 5:
        classNames += "Five";
        break;
      default:
        break;
    }

    if (this.state.giveFocus) {
      classNames += " focusLeaderboardItem";
    }

    return classNames;
  }

  render() {
    let width = (this.state.score / MAX_SCORE) * 100;

    return (
      <LeaderboardItemContainer
        className={this.getItemClassNames()}
        ref={this.containerRef}
        style={{
          width: `${width}%`,
        }}
      >
        <LeaderboardIndex> {this.state.idx} </LeaderboardIndex>
        <LeaderboardUsername> {this.state.username}</LeaderboardUsername>
        <LeaderboardScore> {this.state.score} </LeaderboardScore>
      </LeaderboardItemContainer>
    );
  }
}
