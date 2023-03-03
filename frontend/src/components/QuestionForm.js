import React from 'react';

export default class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionTxt: props.qTxt,
            answerTxts:[props.a1Txt, props.a2Txt, props.a3Txt, props.a4Txt],
            questionAnswer: props.qAns,
        }
    }

    render() {
        return (<>Yo</>)
    }
}