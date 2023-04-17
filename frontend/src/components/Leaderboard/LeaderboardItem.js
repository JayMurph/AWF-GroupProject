import React from "react";
import {
  LeaderboardIndex,
  LeaderboardItemContainer,
  LeaderboardScore,
} from "../../StyledElements";
import { GetProfile } from "../../ApiCalls";

const MAX_SCORE = 8000;
const MIN_WIDTH_PERCENTAGE = 30;
const MIN_HEIGHT = 80;
const MIN_FONT_SIZE = 32;
const FOCUS_COLOR = "#E4D00A";

const TOP_HEIGHT_INC = 15;
const TOP_FONT_SIZE_INC = 8;

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
   * Calculates and returns size values for item depdending on its score value
   * and idx
   * @returns {width, height, fontSize}
   */
  calculateSizeAttributes() {
    let width = (this.state.score / MAX_SCORE) * 100;
    width = width < MIN_WIDTH_PERCENTAGE ? MIN_WIDTH_PERCENTAGE : width;

    let height =
      this.state.idx >= 5
        ? MIN_HEIGHT
        : MIN_HEIGHT + TOP_HEIGHT_INC * (5 - this.state.idx);

    let fontSize =
      this.state.idx >= 5
        ? MIN_FONT_SIZE
        : MIN_FONT_SIZE + TOP_FONT_SIZE_INC * (5 - this.state.idx);
    return { width, height, fontSize };
  }

  render() {
    const { width, height, fontSize } = this.calculateSizeAttributes();

    return (
      <>
        <LeaderboardItemContainer
          ref={this.containerRef}
          style={{
            width: `${width}%`,
            alignSelf: "start",
            height: `${height}px`,
            background: this.state.giveFocus && FOCUS_COLOR,
          }}
        >
          <LeaderboardIndex style={{ fontSize: `${fontSize}px` }}>
            {this.state.idx}
          </LeaderboardIndex>
          <div>{this.state.username}</div>
          <LeaderboardScore style={{ fontSize: `${fontSize}px` }}>
            {this.state.score}
          </LeaderboardScore>
        </LeaderboardItemContainer>
      </>
    );
  }
}
