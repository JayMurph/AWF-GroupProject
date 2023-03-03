import React from "react";
import CategorySelection from "../components/CategorySelection";
import QuestionsSequence from "../components/QuestionsSequence";
import TriviaQuestion from "../TriviaQuestion.js";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: null,
      currCategory: "",
      categories: ["History", "Science", "Math", "Literature"],
    };

    // get categories from API
    this.state.root = (
      <CategorySelection
        categories={this.state.categories}
        onCategorySelection={this.onCategorySelection}
      />
    );
  }

  onCategorySelection = (c) => {
    // get questions from API
    const triviaQuestions = [
        { category: "History", qTxt: "The modern-day city Istanbul last used to be called:", qAns: 4, a1Txt: "Byzantium", a2Txt: "Tsargrad", a3Txt: "Ankara", a4Txt: "Constantinople"},
        { category: "History", qTxt: "Germany was unified in the 1800's by which state:", qAns: 3, a1Txt: "Austria", a2Txt: "Hanover", a3Txt: "Prussia", a4Txt: "Russia"},
        { category: "History", qTxt: "Canada's oldest company is:", qAns: 4, a1Txt: "Tim Hortons", a2Txt: "Royal Bank of Canada (RBC)", a3Txt: "Irving Oil", a4Txt: "Hudson's Bay Company (HBC)"},
        { category: "History", qTxt: "What was the name of the first Roman Emperor?", qAns: 3, a1Txt: "Nero", a2Txt: "Hardian", a3Txt: "Augustus", a4Txt: "Claudius"},
        { category: "History", qTxt: "What historical event was Anne Frank a part of?", qAns: 3, a1Txt: "Partisan resistance to Nazi rule", a2Txt: "The Holodomor", a3Txt: "The Holocaust", a4Txt: "Operation Market Garden"}, 
    ].map((q) => ( new TriviaQuestion(q.qTxt, [q.a1Txt, q.a2Txt, q.a3Txt, q.a4Txt], q.qAns - 1)));

    // start quiz for category
    this.setState({ currCategory: c });
    this.setState(
        {
            root: < QuestionsSequence category={c} triviaQuestions={triviaQuestions} /> 
        }
    );
  };

  render() {
    return this.state.root;
  }
}
