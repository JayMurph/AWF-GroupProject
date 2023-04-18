import React from "react";
import {
  LeaderboardIndex,
  LeaderboardItemContainer,
  LeaderboardScore,
} from "../../StyledElements";
import { GetProfile } from "../../ApiCalls";

const MAX_SCORE = 10000;
const MIN_WIDTH_PERCENTAGE = 25;
const MIN_HEIGHT = 80;
const MIN_SCORE_FONT_SIZE = 32;
const MIN_USERNAME_FONT_SIZE = 16;
const FOCUS_COLOR = "#E4D00A";
const TOP_SCORES_COUNT = 5;

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
   * @returns {width, height, scoreFontSize, userNameFontSize}
   */
  calculateSizeAttributes() {
    let width = (this.state.score / MAX_SCORE) * 100;
    width = width < MIN_WIDTH_PERCENTAGE ? MIN_WIDTH_PERCENTAGE : width;

    let height =
      this.state.idx >= TOP_SCORES_COUNT
        ? MIN_HEIGHT
        : MIN_HEIGHT + TOP_HEIGHT_INC * (TOP_SCORES_COUNT - this.state.idx);

    let scoreFontSize =
      this.state.idx >= TOP_SCORES_COUNT
        ? MIN_SCORE_FONT_SIZE
        : MIN_SCORE_FONT_SIZE + TOP_FONT_SIZE_INC * (TOP_SCORES_COUNT - this.state.idx);

      let userNameFontSize = 
        this.state.idx >= TOP_SCORES_COUNT
          ? MIN_USERNAME_FONT_SIZE  
          : MIN_USERNAME_FONT_SIZE + TOP_FONT_SIZE_INC * (TOP_SCORES_COUNT - this.state.idx);
    return { width, height, scoreFontSize, userNameFontSize};
  }

  render() {
    const { width, height, scoreFontSize, userNameFontSize } = this.calculateSizeAttributes();

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
          <LeaderboardIndex style={{ fontSize: `${scoreFontSize}px` }}>
            {this.state.idx}
          </LeaderboardIndex>
          <div style={{ fontSize: `${userNameFontSize}px` }}>{this.state.username}</div>
          <LeaderboardScore style={{ fontSize: `${scoreFontSize}px` }}>
            {this.state.score}
          </LeaderboardScore>
        </LeaderboardItemContainer>
      </>
    );
  }
}
