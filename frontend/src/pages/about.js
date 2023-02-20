import React from "react";
import Styles from '../styles.module.css';
import {Paragraph, CenteredDiv} from '../StyledElements'

const About = () => {
return (
	<CenteredDiv>
            <h1>
                Trivia Mania
            </h1>
            <div>
                <Paragraph className="{Styles.Paragraph}">
                    Unleash your inner genius with Trivia Mania! 
                </Paragraph> 
                <Paragraph  className={Styles.Paragraph}>
                    Test your knowledge in math, history, science, literature, and more. 
                </Paragraph>
                <Paragraph>
                    Play now and become the ultimate trivia champion!
                </Paragraph>
            </div>
	</CenteredDiv>
);
};

export default About;
