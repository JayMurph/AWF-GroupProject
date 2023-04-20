import styled from "styled-components";
import "./styles.module.css";

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
`;


export const PadLabel = styled.label`
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: bold;
`;

export const ChangePasswordDiv = styled.div`
    position:absolute;
    left: 40%;
    top: 25%;
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
    height:80vh;
    width:100%;
`;

export const AccountContentContainer = styled.div`
    float: right;
    height:80vh;
    width:80vw;
`;

export const ImageBox = styled.div`
    position:absolute;
    left: 25vw;
    top: 20vh;
    width: 200px;
    height:230px;
`;

export const ScoreTable = styled.table`   
    position:absolute;
    left: 40vw;
    top: 40vh;
    text-align: center;
    width:600px;
`;

export const Username = styled.div`
    position:absolute;
    top: 170px;
    width: 200px;
    text-align: center;
`;

export const RecentScoreList = styled.div`
    position:absolute;
    left: 45vw;
    top: 60vh;
    width: 200px;
    text-align: center;
`;

export const ProfileContainer = styled.div`
    position:absolute;
    left: 35vw;
    top: 30vh;
    width: 40vw;
`;

export const DivLine = styled.div`
    position: relative;
    padding-bottom: 10px; 
    width:100%; 
    display: flex;
    justify-content: space-between;
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

export const CenteredForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const ErrorLabel = styled(CenteredDiv)`
    className:'error';
    color:#df0000;
`;

export const LeaderboardContainer = styled(CenteredDiv)`
    row-gap:24px;
`

export const LeaderboardItemContainer = styled.div`
    height:80px;
    width:90%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background:lightGray;
    border-radius:20px;
`

export const LeaderboardIndex = styled.div`
    font-size:48px;
    margin:32px;
    font-weight:bold;
`

export const LeaderboardScore = styled.div`
    margin:32px;
    margin-left:auto;
    font-size:48px;
    font-weight:bold;
`