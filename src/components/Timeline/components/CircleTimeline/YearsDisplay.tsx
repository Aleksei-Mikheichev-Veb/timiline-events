import React from 'react';
import styled from "styled-components";
import { TimelinePeriod } from '../../Timeline';

const YearsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 47%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:180px;
  
  @media (max-width: 1200px) {
    gap:150px;
  }
  @media (max-width: 768px) {
    position: static;
    justify-content: center;
    gap:50px;
    transform: none;
    padding: 156px 0 56px;
    border-bottom:1px solid #C7CDD9;
  }
  @media (max-width: 560px) {
    padding: 86px 0 56px;
  }
  @media (max-width: 450px) {
    gap:20px;
  }
`;

const BaseYear = styled.div`
  font-size: 170px;
  font-weight: 700;
  
  @media (max-width: 1200px) {
    font-size: 120px;
  }@media (max-width: 900px) {
    font-size: 100px;
  }
  @media (max-width: 560px) {
    font-size: 56px;
  }
`;

const StartYear = styled(BaseYear)`
  color: #5D5FEF;
  position: relative;
`;

const EndYear = styled(BaseYear)`
  color: #EF5DA8;
`;


interface YearsDisplayProps {
    activePeriod:TimelinePeriod | null;
}

const YearsDisplay: React.FC<YearsDisplayProps> = ({activePeriod}) => {
    return (
        <YearsContainer>
            {activePeriod && (
                <>
                    <StartYear>{activePeriod.startYear}</StartYear>
                    <EndYear>{activePeriod.endYear}</EndYear>
                </>
            )}
        </YearsContainer>
    );
};

export default YearsDisplay;