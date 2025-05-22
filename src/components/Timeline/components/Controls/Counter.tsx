import React from 'react';
import styled from "styled-components";

interface CounterProps {
    activePeriodId: number;
    NumberOfPeriods: number;
}

const StyledCounter = styled.div`
  font-size: 14px;
  color: #42567A;
  margin-bottom: 20px;
`;

const Counter: React.FC<CounterProps> = ({NumberOfPeriods, activePeriodId}) => {
    return (
        <StyledCounter>
            {`0${activePeriodId}`}/{`0${NumberOfPeriods}`}
        </StyledCounter>
    );
};

export default Counter;