import React from "react";
import { CenteredDiv, ErrorLabel } from "../../StyledElements";
import { GetCategoryQuizResultsPage, PostQuizResults } from "../../ApiCalls";
import LeaderboardList from "../Leaderboard/LeaderboardList";
import { GetSessionAccessToken } from "../../Storage";

/**
 * Placeholder page. Displays the results of a quiz: Total score plus score and
 * answer for each question
 */
export default class QuizResultsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizResults: props.quizResults,
      category: props.quizResults.getCategory(),
      userId: props.userId,
      postResponseData: null,
      content: null,
      errorText: "",
    };
  }

  // post quiz results, get leaderboard items to display
  async componentDidMount() {
    if (this.state.postResponseData == null) {
      const timestamp = this.createPostQuizTimestamp();
      await PostQuizResults(
        this.state.userId,
        this.state.quizResults,
        timestamp,
        GetSessionAccessToken()
      )
        .then((res) => res.json())
        .then(async (data) => {
          this.setState({ postResponseData: data });
          let isScoreOnFirstPage = data.page === 1;
          // if score is not on first page, get 3 pages starting at N-1, else get 2 pages starting at 1
          let startPage = isScoreOnFirstPage ? 1 : data.page - 1;
          let pageCount = isScoreOnFirstPage ? 2 : 3;
          let leaderboardItems = await this.getInitialLeaderboardItems(
            startPage,
            pageCount
          );

          this.setState({
            content: (
              <LeaderboardList
                category={this.state.category}
                initialItems={leaderboardItems}
                startPageNum={startPage}
                endPageNum={startPage + leaderboardItems.length / 10}
                focusItemIdx={data.globalPosition}
              ></LeaderboardList>
            ),
          });
        })
        .catch((err) => {
          this.displayErrorMessage(err);
        });
    }
  }

  /**
   * Produces a timestamp of the current time in the format expected by the
   * backed for a quiz result post
   * @returns Timestamp string suitable for quiz results
   */
  createPostQuizTimestamp() {
    return new Date().toISOString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  /**
   * Retrieves and returns several pages of leaderboard entries
   * @param {int} initialPage : Starting page of items to retrieve
   * @param {int} pageCount : Total number of pages to retrieve
   * @returns
   */
  async getInitialLeaderboardItems(initialPage, pageCount) {
    let leaderboardItems = [];

    for (let i = initialPage; i < initialPage + pageCount; i++) {
      try {
        let hasMore = await GetCategoryQuizResultsPage(this.state.category, i)
          .then((leaderBoardRes) => leaderBoardRes.json())
          .then((leaderboardResData) => {
            if (leaderboardResData.length > 0) {
              leaderboardItems.push(...leaderboardResData);
              return true;
            }
            return false;
          })
          .catch((err) => false);
        if (!hasMore) {
          break;
        }
      } catch (err) {
        this.displayErrorMessage(err);
        break;
      }
    }

    return leaderboardItems;
  }

  /**
   * Displays error message in body content
   * @param {string} err : to be displayed
   */
  displayErrorMessage(err) {
    console.log(err);
    this.setState({ errorText: err });
  }

  render() {
    return (
      <>
        <>{this.state.content ?? (<CenteredDiv><b>Loading ...</b></CenteredDiv>)}</>
        <ErrorLabel>{this.state.errorText}</ErrorLabel>
      </>
    );
  }
}
