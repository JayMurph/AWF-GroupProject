import styled from "styled-components";
import "./styles.module.css";
import QuestionsSequence from "./components/Quiz/QuestionsSequence";

export const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export const PageHeader = styled.h1`
  text-align: center;
  min-width: 0px;
`;
export const ButtonDiv = styled(CenteredDiv)`
  margin: 2rem 0;
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0px;
  width: 100%;
  min-height: 0px;
  height: 100%;
`;

export const QuestionSequenceHeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 33% 33% 33%;

  width: 90%;
  min-width: 0px;
  min-height: 0px;

  justify-content: space-between;
  align-self: center;
  align-items: center;

  @media (max-width: 640px) {
    font-size: 2.3vw;
  }
`;

export const LeaderboardHeaderContainer = styled(QuestionSequenceHeaderContainer)`
  width:100%
`

export const AppContentContainer = styled(FlexColumnContainer)`
  height: 88vh;
`;
export const NoBreakScrollDiv = styled(CenteredDiv)`
  display: grid;
  overflow-y: auto;
`;

export const ScrollDiv = styled(CenteredDiv)`
  display: grid;
  overflow-y: auto;

  @media (max-height: 420px) and (orientation: landscape) {
    display: grid;
    grid-template-columns: 48% 48%;
    column-gap: 2vw;
  }
`;

export const CategorySelectionScrollDiv = styled(ScrollDiv)`
  width: 90%;
  min-height: 0px;
  height: 90%;
  align-self: center;
`;

export const Button = styled.button`
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;

  max-width: 11rem;
  width: 20vw;

  border: 0px;
  color: var(--buttonText);
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: var(--navBackground);
  }
  &:active {
    background: var(--activeButton);
  }

  font-size: 26px;
  @media (max-width: 640px) or (max-height: 420px) {
    font-size: 3.5vw;
  }
`;

export const FormButton = styled(Button)`
    @media (max-width:640px) {
        width:40vw;
        height 48px;
        font-size:6vw
    }
`;

export const BigButton = styled(Button)`
  display: block;
  max-width: 70vw;
  width: 70vw;
  height: 7rem;
  margin: 1rem 0 1rem 0;
  color: black;
  font-weight: bold;
  font-size: 2rem;

  @media (max-width: 640px) or (max-height: 420px) {
    height: 3.5rem;
    font-size: 1rem;
  }

  @media (max-height: 420px) and (orientation: landscape) {
    width: 90%;
  }
`;

export const Paragraph = styled.p`
  text-align: center;
  margin: 10px 10vw;
`;

export const FormTextbox = styled.input`
  width: 240px;
  height: 28px;
`;

export const CenteredForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorLabel = styled(CenteredDiv)`
  classname: "error";
  color: #df0000;
`;

export const QuestionTextHeader = styled.div`
    padding:2vw;
    height: min-content;
    font-size 36px;
    font-weight:bold;
    text-align: center;
    align-content:center;
    min-width:0px;
    @media (max-width:640px) or (max-height:420px) {
        font-size:1.5rem;
    }
`;

export const AnswerButton = styled(BigButton)`
  min-height: min-content;

  @media (max-width: 640px) or (max-height: 420px) {
    height: 3rem;
    min-height: 18px;
  }
`;

export const AnswerScrollDiv = styled(ScrollDiv)`
  width: 90%;
  min-height: 0px;
  height: 90%;
  align-self: center;
`;

export const LeaderboardItemContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-self:start;

  border-radius: 20px;
  @media (max-width:640px) or (max-height:640px){
    border-radius: 5px;
  }
`;

export const LeaderboardIndex = styled.div`
  font-size:32px;
  font-weight: bold;
  margin-right: 1.4vw;
  margin-left: 1.4vw;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size:32px;
  @media (max-width:640px) or (max-height:640px){
    font-size:22px;
  }
`;

export const LeaderboardScore = styled.div`
  margin-right: 1vw;
  margin-left: auto;
  padding-left: 2vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size:32px;
  @media (max-width:640px) or (max-height:640px){
    font-size:22px;
  }
`;

export const LeaderboardUsername = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size:16px;
`

export const InfiniteListOuter = styled(FlexColumnContainer)`

overflow:clip;

margin-top:1vh;
margin-bottom:1vh;

@media (max-height:420px) {
  margin-top:3vh;
  margin-bottom:2vh;
}
`

export const LeaderboardContainer = styled(CenteredDiv)`

  @media (min-width: 641px) and (min-height:641px){
    >* {
      height:55px;
      min-width:min-content;
    }

    >div:nth-child(1) {
      height:100px
    }
    >div:nth-child(1) > ${LeaderboardIndex} {
      font-size:72px;
    }
    >div:nth-child(1) > ${LeaderboardScore} {
      font-size:72px;
    }
    >div:nth-child(1) > ${LeaderboardUsername} {
      font-size:64px;
    }

    >div:nth-child(2) {
      height:90px
    }
    >div:nth-child(2) > ${LeaderboardIndex} {
      font-size:64px;
    }
    >div:nth-child(2) > ${LeaderboardScore} {
      font-size:64px;
    }
    >div:nth-child(2) > ${LeaderboardUsername} {
      font-size:56px;
    }

    >div:nth-child(3) {
      height:80px
    }
    >div:nth-child(3) > ${LeaderboardIndex} {
      font-size:56px;
    }
    >div:nth-child(3) > ${LeaderboardScore} {
      font-size:56px;
    }
    >div:nth-child(3) > ${LeaderboardUsername} {
      font-size:48px;
    }

    >div:nth-child(4) {
      height:70px
    }
    >div:nth-child(4) > ${LeaderboardIndex} {
      font-size:48px;
    }
    >div:nth-child(4) > ${LeaderboardScore} {
      font-size:48px;
    }
    >div:nth-child(4) > ${LeaderboardUsername} {
      font-size:32px;
    }

    >div:nth-child(5) {
      height:60px
    }
    >div:nth-child(5) > ${LeaderboardIndex} {
      font-size:40px;
    }
    >div:nth-child(5) > ${LeaderboardScore} {
      font-size:40px;
    }
    >div:nth-child(5) > ${LeaderboardUsername} {
      font-size:24px;
    }
  }

  @media (max-width:640px) or (max-height:640px){
    >* {
      height:35px;
      min-width:min-content;
    }
  }


  row-gap: 24px;
  @media (max-width:640px) or (max-height:640px){
    row-gap: 16px;
  }
`;

