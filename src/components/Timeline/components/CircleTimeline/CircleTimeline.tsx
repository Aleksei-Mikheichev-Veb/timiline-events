import React from 'react';
import styled from "styled-components";
import TimelinePoint from "./TimelinePoint";
import YearsDisplay from "./YearsDisplay";
import { TimelinePeriod } from '../../Timeline';
const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  margin: 0 auto;
  &:after {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1440px;
    height: 1px;
    background: rgba(66, 86, 122, 0.20);
  }
  @media (max-width: 1200px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: 900px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    &:after {
      display: none;
    }
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(66, 86, 122, 0.20);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index:5;
  transform-origin: 0 0;
  transition: transform 0.5s ease;
  @media (max-width: 768px) {
    display: none;
  }
`;

interface CircleTimelineProps {
    periods: TimelinePeriod[];
    activePeriod: TimelinePeriod | null;
    activePeriodId: number;
    onPeriodChange: (periodId: number) => void;
    circleRef: React.RefObject<HTMLDivElement>;
    rotationAngle: number;
}

const CircleTimeline: React.FC<CircleTimelineProps> = ({ periods,activePeriod, activePeriodId, onPeriodChange,circleRef,rotationAngle }) => {
    return (
        <CircleContainer>
            <Circle ref={circleRef}>
                {periods.map((period, index) => {
                    const angle = (index * (360 / periods.length));
                    const angleForSmall = -angle - rotationAngle
                    return (
                        <TimelinePoint key={period.id}
                                       period={period}
                                       isActive={period.id === activePeriodId}
                                       // angle={calculateAngle(index)}
                                       angleForBig={angle}
                                       angleForSmall={angleForSmall}
                                       onPeriodChange={onPeriodChange}/>

                    );
                })}
            </Circle>
            <YearsDisplay
                activePeriod={activePeriod}
                // startYear={activePeriod.startYear}
                // endYear={activePeriod.endYear}
            />
        </CircleContainer>
    );
};

export default CircleTimeline;