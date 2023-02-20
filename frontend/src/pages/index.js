import React from 'react';
import {Paragraph, CenteredDiv} from '../StyledElements'


const Home = () => {
return (
	<CenteredDiv>
            <h1>
                Trivia Mania
            </h1>
            <div>
                <Paragraph>
                    Unleash your inner genius with Trivia Mania! 
                </Paragraph> 
                <Paragraph>
                    Test your knowledge in math, history, science, literature, and more. 
                </Paragraph>
                <Paragraph>
                    Play now and become the ultimate trivia champion!
                </Paragraph>
            </div>
	</CenteredDiv>
);
};

export default Home;
