import React from 'react';
import styled from "styled-components";
import Counter from "./Counter";
import ButtonsContainer from "../UI/ButtonsContainer";
import ArrowIcon from "../UI/ArrowIcon";
import {TimelinePeriod} from "../../types/types";

interface NavigationControlsProps {
    onPeriodChange: (id: number) => void;
    periods: TimelinePeriod[];
    activePeriodId: number;
    NumberOfPeriods: number;
}

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 200px;
  left: 80px;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    bottom:0;
    left: 0;
    z-index: 10;
  }
`;

const Button = styled.button<{ $disabled?: boolean }>`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #F4F5F9;
  border: 1px solid #42567A;
  cursor: ${props => props.$disabled ? 'default' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  
  &:hover {
    background-color: ${props => props.$disabled ? '#F4F5F9' : '#fff'};
  }
  @media (max-width: 450px) {
    width: 25px;
    height: 25px;
  }
`;

const NavigationControls: React.FC<NavigationControlsProps> = ({
                                                                   activePeriodId,
                                                                   periods,
                                                                   onPeriodChange,
                                                                   NumberOfPeriods}) => {
    const handlePrevPeriod = () => {
        const currentIndex = periods.findIndex(p => p.id === activePeriodId);
        if (currentIndex > 0) {
            onPeriodChange(periods[currentIndex - 1].id);
        }
    };
    const handleNextPeriod = () => {
        const currentIndex = periods.findIndex(p => p.id === activePeriodId);
        if (currentIndex < periods.length - 1) {
            onPeriodChange(periods[currentIndex + 1].id);
        }
    };
    return (
        <ControlsContainer>
            <Counter NumberOfPeriods={NumberOfPeriods} activePeriodId={activePeriodId}/>
            <ButtonsContainer>
                <Button
                    onClick={handlePrevPeriod}
                    $disabled={activePeriodId === 1}
                >
                    <ArrowIcon direction="left" />
                </Button>
                <Button
                    onClick={handleNextPeriod}
                    $disabled={activePeriodId === NumberOfPeriods}
                >
                    <ArrowIcon direction="right" />
                </Button>
            </ButtonsContainer>
        </ControlsContainer>
    );
};

export default NavigationControls;