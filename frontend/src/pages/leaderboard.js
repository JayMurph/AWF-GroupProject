import React from "react";
import { API_URL } from "../App";
import CategorySelection from "../components/Quiz/CategorySelection";
import { Header, Title } from "../components/Navbar/NavbarElements";
import { PageHeader } from "../StyledElements";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: null,
      currCategory: "",
      categories: [],
    };

    this.state.root = (
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
      root: (
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
   * Handles when user selects a quiz category. ........
   * @param {String} category Name of quiz category selected by user
   */
  onCategorySelection = async (category) => {
    // get questions from API
    await fetch(API_URL + "/leaderboard?category=" + category)
      .then((res) => {
        try {
          res = res.json();
        } catch (err) {
          this.setState({
            root: (
              <>
                <PageHeader>No {category.substring(0,1).toUpperCase() + category.substring(1)} High Scores</PageHeader>
                <CategorySelection
                  key={null}
                  categories={this.state.categories}
                  onCategorySelection={this.onCategorySelection}
                />
              </>
            ),
          });
          return;
        }

        if (res.length > 0) {
          //const triviaQuestions = res.map(
          //  (q) =>
          //    new TriviaQuestion(
          //      q.qTxt,
          //      [q.a1Txt, q.a2Txt, q.a3Txt, q.a4Txt],
          //      q.qAns - 1 //make index 0-based
          //    )
          //);

          // start quiz for category
          this.setState({ currCategory: category });
          this.setState({
            root: <h1>{category}</h1>,
          });
        } else {
          this.setState({
            root: (
              <>
                <PageHeader>No {category.substring(0,1).toUpperCase() + category.substring(1)} High Scores</PageHeader>
                <CategorySelection
                  key={null}
                  categories={this.state.categories}
                  onCategorySelection={this.onCategorySelection}
                />
              </>
            ),
          });
          return;
        }
      })
      .catch((er) => console.log(er));
  };

  render() {
    return this.state.root;
  }
}
