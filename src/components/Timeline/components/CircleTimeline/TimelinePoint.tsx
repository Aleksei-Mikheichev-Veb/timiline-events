import React from 'react';
import styled from "styled-components";
import { TimelinePeriod } from "../../Timeline";

const TimelinePointBox = styled.div`
  position: absolute;
  width: 56px;
  height: 56px;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);

  @media (max-width: 900px) {
    width: 46px;
    height: 46px;
  }
`

const StyledTimelinePoint = styled.div<{ angleForBig: number; angleForSmall: number; isActive: boolean }>`
  position: absolute;
  width: 56px;
  height: 56px;
  transform-origin: center;
  transform: ${props => `rotate(${props.angleForBig}deg) translate(265px) rotate(${ props.angleForSmall}deg)`};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover .point-number {
    opacity: 1;
    transform: scale(1);
    background-color: #F4F5F9;
  }
  &:hover .point{
    background-color: #F4F5F9;
    width: 56px;
    height: 56px;
  }
  @media (max-width: 1200px) {
    transform: ${props => `rotate(${props.angleForBig}deg) translate(225px) rotate(${ props.angleForSmall}deg)`};
  }
  @media (max-width: 900px) {
    transform: ${props => `rotate(${props.angleForBig}deg) translate(200px) rotate(${ props.angleForSmall}deg)`};
    width: 46px;
    height: 46px;
  }
`;

const Point = styled.div<{ isActive: boolean }>`
  width: ${props => props.isActive ? '56px' : '6px'};
  height: ${props => props.isActive ? '56px' : '6px'};
  border-radius: 50%;
  border: 1px solid rgba(48, 62, 88, 0.5);
  background-color: ${props => props.isActive ? '#F4F5F9' : '#42567A'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 900px) {
    width: ${props => props.isActive ? '46px' : '6px'};
    height: ${props => props.isActive ? '46px' : '6px'};
  }
`;

const PointNumber = styled.span<{ isActive: boolean }>`
  color: #42567A;
  font-size: 20px;
  font-weight: 400;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
  transition: all 0.3s ease;
`;

interface TimelinePointProps {
    period: TimelinePeriod;
    isActive: boolean;
    angleForBig: number;
    angleForSmall: number;
    onPeriodChange: (periodId: number) => void;
}

const TimelinePoint: React.FC<TimelinePointProps> = ({ period, isActive, angleForBig, angleForSmall, onPeriodChange }) => {
    return (
        <TimelinePointBox key={period.id}>
            <StyledTimelinePoint
                angleForBig={angleForBig}
                angleForSmall={angleForSmall}
                isActive={isActive}
                onClick={() => onPeriodChange(period.id)}
            >
                <Point isActive={isActive} className="point">
                    <PointNumber
                        className="point-number"
                        isActive={isActive}
                    >
                        {period.id}
                    </PointNumber>
                </Point>
            </StyledTimelinePoint>
        </TimelinePointBox>
    );
};

export default TimelinePoint;