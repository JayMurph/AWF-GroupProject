import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import { FlexColumnContainer, QuestionSequenceHeaderContainer, QuestionSequenceHeaderItem} from "../StyledElements";

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currPgIdx:0,
      currQuestionNum:0,
      currTime:0.0,
      category: props.category,
      questionsArr: props.questionsArr,
    };

    this.state.pages.push(
      <QuizStartForm
        category={this.state.category}
        onButtonClick={this.onStartButtonClick}
      />
    );
    this.state.questionsArr.forEach((q) => {
      this.state.pages.push(
        <QuestionForm
          question={q.question}
          answers={q.answers}
          answerIdx={q.answserIdx}
        />
      );
    });
  }

  onStartButtonClick = () => {
    this.setState({currPgIdx:1})
  };

  render() {
    return (
      <FlexColumnContainer>
        <QuestionSequenceHeaderContainer>
            <div style={{justifySelf:"start"}}>
                <h2>
                    Question {this.state.currQuestionNum}
                </h2>
            </div>
            <div style={{justifySelf:"center", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <h1 style={{marginRight:"22px"}}>
                    {this.state.currTime.toFixed(2)} 
                </h1>
                <h2>
                    secs
                </h2>
            </div>
            <div style={{justifySelf:"end"}}>
                <h2>
                    {this.state.category}
                </h2>
            </div>
        </QuestionSequenceHeaderContainer>
        <FlexColumnContainer>
            {this.state.pages[this.state.currPgIdx]}
        </FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
