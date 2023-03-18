import React from "react";
import CategorySelection from "../components/Quiz/CategorySelection";
import QuestionsSequence from "../components/Quiz/QuestionsSequence";
import TriviaQuestion from "../components/Quiz/TriviaQuestion.js";

/**
 * Pages that guides user through an entire quiz. Gets categories and quiz
 * questions from api then shows appropriate elements.
 */
export default class Quiz extends React.Component {
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
    await fetch(process.env.REACT_APP_API_URL + "/quiz")
      .then((res) => res.json())
      .then((res) => this.updateRootWithCategories(res))
      .catch((er) => console.log(er));
  }

  /**
   * Handles when user selects a quiz category. Gets quiz questions from API
   * then displays content to show quiz
  * @param {String} category Name of quiz category selected by user
   */
  onCategorySelection = async (category) => {
    // get questions from API
    await fetch(process.env.REACT_APP_API_URL + "/quiz?category=" + category)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          const triviaQuestions = res.map(
            (q) =>
              new TriviaQuestion(
                q.qTxt,
                [q.a1Txt, q.a2Txt, q.a3Txt, q.a4Txt],
                q.qAns - 1 //make index 0-based
              )
          );

          // start quiz for category
          this.setState({ currCategory: category });
          this.setState({
            root: (
              <QuestionsSequence
                category={category}
                triviaQuestions={triviaQuestions}
              />
            ),
          });
        }
      })
      .catch((er) => console.log(er));
  };

  render() {
    return this.state.root;
  }
}
