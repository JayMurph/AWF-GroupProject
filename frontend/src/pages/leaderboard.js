import React from "react";
import { API_URL } from "../App";
import CategorySelection from "../components/Quiz/CategorySelection";
import { PageHeader } from "../StyledElements";
import LeaderboardList from "../components/Leaderboard/LeaderboardList";
import { GetCategoryQuizResultsPage } from "../ApiCalls";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      headerText: "",
      currCategory: "",
      categories: []
    };

    this.state.content = (
      <CategorySelection
        categories={this.state.categories}
        onCategorySelection={this.onCategorySelection}
      />
    );
  }

  /**
   * Gives a list of categories to be displayed on the page
   * @param {String[]} categories Category names
   */
  updateRootWithCategories = (categories) => {
    this.setState({
      categories: categories,
      content: (
        <CategorySelection
          key={null}
          categories={categories}
          onCategorySelection={this.onCategorySelection}
        />
      ),
    });
  };

  /**
   * Gets quiz categories from API to display on page
   */
  async componentDidMount() {
    await fetch(API_URL + "/quiz")
      .then((res) => res.json())
      .then((res) => this.updateRootWithCategories(res))
      .catch((er) => console.log(er));
  }

  /**
   * Handles when user selects a quiz category. Retrieves category leaderboard
   * questions from API and displays them
   * @param {String} category Name of quiz category selected by user
   */
  onCategorySelection = async (category) => {
    // get and display leaderboard entries for quiz category
    await GetCategoryQuizResultsPage(category, 1)
      .then(async (res) => {
        try {
          res = await res.json();
        } catch (err) {
          // No high scores
          this.setState({
            headerText:
              "No " +
              category.substring(0, 1).toUpperCase() +
              category.substring(1) +
              " High Scores",
            content: (
              <CategorySelection
                key={null}
                categories={this.state.categories}
                onCategorySelection={this.onCategorySelection}
              />
            ),
          });
          return;
        }

        console.log(res);
        if (res.length > 0) {
          this.setState({ currCategory: category });
          this.setState({
            // display leaderboard
            headerText:
              category.substring(0, 1).toUpperCase() + category.substring(1),
            content: (
              <LeaderboardList
                category={category}
                initialItems={res}
              />
            ),
          });
        } else {
          // NO HIGH SCORES
          this.setState({
            headerText:
              "No " +
              category.substring(0, 1).toUpperCase() +
              category.substring(1) +
              " High Scores",
            content: (
              <CategorySelection
                key={null}
                categories={this.state.categories}
                onCategorySelection={this.onCategorySelection}
              />
            ),
          });
          return;
        }
      })
      .catch((er) => console.log(er));
  };

  render() {
    return (
      <>
        <PageHeader>{this.state.headerText}</PageHeader>
        <>{this.state.content}</>
      </>
    );
  }
}
