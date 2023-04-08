import React from 'react';
import { LeaderboardItemContainer } from '../../StyledElements';

const MAX_SCORE = 8000;

export default class LeaderboardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:props.userId,
            timeStamp:props.timeStamp,
            score:props.score,
            idx:props.idx,
        };
    }

    render() {
        return <LeaderboardItemContainer> 
            {this.state.idx} {this.state.userId} {this.state.finalScore} {this.state.timeStamp} 
        </LeaderboardItemContainer>
    }
}