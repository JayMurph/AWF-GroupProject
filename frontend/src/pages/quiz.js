import React from "react";
import CategorySelection from "../components/Quiz/CategorySelection";
import QuestionsSequence from "../components/Quiz/QuestionsSequence";
import TriviaQuestion from "../components/Quiz/TriviaQuestion.js";

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

  updateRoot = (categories) => {
    this.setState(
      {
        categories:categories,
        root: (
          <CategorySelection
            key={null}
            categories={categories}
            onCategorySelection={this.onCategorySelection}
          />
        )
      }
    );
  }

  async componentDidMount() {
    await fetch(process.env.REACT_APP_API_URL + "/quiz")
      .then((res) => res.json())
      .then((res) => this.updateRoot(res))
      .catch((er)=>console.log(er));
  }

  onCategorySelection = async (c) => {
    // get questions from API
    await fetch(process.env.REACT_APP_API_URL + "/quiz?category=" + c)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          const triviaQuestions = 
            res.map((q) => ( new TriviaQuestion(q.qTxt, [q.a1Txt, q.a2Txt, q.a3Txt, q.a4Txt], q.qAns - 1)));

          // start quiz for category
          this.setState({ currCategory: c });
          this.setState(
              {
                  root: < QuestionsSequence category={c} triviaQuestions={triviaQuestions} /> 
              }
          );
        }
      })
      .catch((er)=>console.log(er));
  };

  render() {
    return this.state.root;
  }
}
