import React from "react";
import { ErrorLabel, PageHeader } from "../../StyledElements";
import { GetCategoryQuizResultsPage, PostQuizResults } from "../../ApiCalls";
import LeaderboardList from "../Leaderboard/LeaderboardList";

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
      getAccessToken: props.getAccessToken,
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
        this.state.getAccessToken()
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

  displayErrorMessage(err) {
    console.log(err);
    this.setState({ errorText: err });
  }

  render() {
    return (
      <>
        <PageHeader>Score : {this.state.quizResults.getScore()}</PageHeader>
        <>{this.state.content}</>
        <ErrorLabel>{this.state.errorText}</ErrorLabel>
      </>
    );
  }
}
