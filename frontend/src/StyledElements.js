import styled from "styled-components";
import "./styles.module.css";

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
`;

export const PageHeader = styled.h1`
    text-align: center;
    min-width:0px;
`
export const ButtonDiv = styled(CenteredDiv)`
    margin: 2rem 0;
`

export const FlexColumnContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-width:0px;
    width:100%;
    min-height: 0px;
    height: 100%; 
`

export const QuestionSequenceHeaderContainer = styled.div`
    display:grid;
    grid-auto-flow:column;
    grid-template-columns:33% 33% 33%;
    width:90%;
    min-width:0px;
    min-height: 0px;
    justify-content:space-between;
    align-self:center;
    align-items:center;
`

export const AppContentContainer = styled(FlexColumnContainer)`
    height:88vh;
    width:100%;
`;

export const ScrollDiv = styled(CenteredDiv)`
    display:grid;
    overflow-y:scroll;
`;

export const CategorySelectionScrollDiv = styled(ScrollDiv)`
    width:90%;
    min-height:0px;
    height:90%;
    align-self:center;
`;

export const Button = styled.button`
    border-radius: 6px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    border: 0px; 
    color:var(--buttonText);
    transition: background-color .1s ease-in;
    &:hover{
        background-color: var(--navBackground)
    }
    &:active{
        background: var(--activeButton)
    }
    font-size:26px;
`

export const FormButton = Button;

export const BigButton = styled(Button)`
    width: 70vw;
    height: 7rem;
    margin : 1rem 0 1rem 0;
    color: black;
    font-weight:bold;
    font-size: 2rem;
`

export const Paragraph = styled.p`
    text-align: center;
    margin: 10px 10vw;
`;

export const FormTextbox = styled.input`
    width:
    240px;
`;

export const ErrorLabel = styled(CenteredDiv)`
    className:'error';
    color:#df0000;
`;

export const LeaderboardItemContainer = styled(CenteredDiv)`
    height:200px;
    width:90%;
    border:3px solid black;
`

export const LeaderboardIndex = styled(Paragraph)`
`