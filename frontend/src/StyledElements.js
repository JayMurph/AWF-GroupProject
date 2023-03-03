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
`

export const ButtonDiv = styled(CenteredDiv)`
margin: 2rem 0;
`

export const FormButton = styled.button`
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
`;

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