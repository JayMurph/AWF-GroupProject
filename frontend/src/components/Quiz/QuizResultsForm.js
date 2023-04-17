import React from "react";
import { ErrorLabel } from "../../StyledElements";
import { GetCategoryQuizResultsPage, PostQuizResults } from "../../ApiCalls";
import LeaderboardList from "../Leaderboard/LeaderboardList";
import { GetAccessToken } from "../../Storage";

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
        GetAccessToken()
      )
        .then((res) => res.json())
        .then(async (data) => {
          this.setState({ postResponseData: data });
          let initialPage = data.page > 1 ? data.page - 1 : 1;
          let pageCount = data.page > 1 ? 2 : 1;
          let leaderboardItems = await this.getInitialLeaderboardItems(
            initialPage,
            pageCount
          );

          this.setState({
            content: (
              <LeaderboardList
                category={this.state.category}
                initialItems={leaderboardItems}
                initialPage={initialPage}
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
    return new Date().toLocaleDateString(undefined, {
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
        await GetCategoryQuizResultsPage(this.state.category, i)
          .then((leaderBoardRes) => leaderBoardRes.json())
          .then((leaderboardResData) => {
            if (leaderboardResData.length > 0) {
              leaderboardItems.push(...leaderboardResData);
            }
          });
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
        <>{this.state.content}</>
        <ErrorLabel>{this.state.errorText}</ErrorLabel>
      </>
    );
  }
}
