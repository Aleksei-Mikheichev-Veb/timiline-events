import React from 'react';
import styled from 'styled-components';
import Timeline from './components/Timeline';
import {timelineData} from './timelineData/timelineData';



const AppContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #F4F5F9;
`;


const App: React.FC = () => {
    console.log('app')
    return (
        <>
            <AppContainer>
                <Timeline periods={timelineData.periods} />
            </AppContainer>
        </>
    );
};

export default App;


