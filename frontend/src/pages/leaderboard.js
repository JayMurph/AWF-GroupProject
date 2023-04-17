import React from "react";
import { API_URL } from "../App";
import CategorySelection from "../components/Quiz/CategorySelection";
import { Button, PageHeader } from "../StyledElements";
import LeaderboardList from "../components/Leaderboard/LeaderboardList";
import { GetCategoryQuizResultsPage } from "../ApiCalls";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      headerContent: "",
      currCategory: "",
      categories: [],
    };

    this.state.content = (
      <CategorySelection
        key={"unpopulatedCategorySelection"}
        categories={this.state.categories}
        onCategorySelection={this.onCategorySelection}
      />
    );

    this.state.headerContent = <PageHeader>Categories</PageHeader>;
    this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
  }

  /**
   * Gives a list of categories to be displayed on the page
   * @param {String[]} categories Category names
   */
  updateRootWithCategories = (categories) => {
    this.setState({
      categories: categories,
      headerContent: <PageHeader>Categories</PageHeader>,
      content: (
        <CategorySelection
          key={"populatedCategorySelection"}
          categories={categories}
          onCategorySelection={this.onCategorySelection}
        />
      ),
    });
  };

  onBackButtonPressed() {
    this.updateRootWithCategories(this.state.categories);
  }

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
          this.setNoHighScoresAvailableContent(category);
          return;
        }

        if (res.length > 0) {
          this.setState({
            // display leaderboard
            currCategory:category,
            headerContent: (
              <div style={{ display: "flex" }}>
                <Button onClick={this.onBackButtonPressed}>Back</Button>
                <PageHeader style={{ width: "min-content" }}>
                  {category.substring(0, 1).toUpperCase() +
                    category.substring(1)}
                </PageHeader>
              </div>
            ),
            content: <LeaderboardList category={category} initialItems={res} />,
          });
        } else {
          this.setNoHighScoresAvailableContent(category);
          return;
        }
      })
      .catch((er) => console.log(er));
  };

  setNoHighScoresAvailableContent(category) {
    // NO HIGH SCORES
    this.setState({
      headerContent: (
        <PageHeader>
          {"No " +
            category.substring(0, 1).toUpperCase() +
            category.substring(1) +
            " High Scores"}
        </PageHeader>
      ),
      content: (
        <CategorySelection
          key={"populatedCategorySelection"}
          categories={this.state.categories}
          onCategorySelection={this.onCategorySelection}
        />
      ),
    });
  }

  render() {
    return (
      <>
        {this.state.headerContent}
        {this.state.content}
      </>
    );
  }
}
