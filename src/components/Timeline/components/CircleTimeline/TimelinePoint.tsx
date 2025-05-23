import React from 'react';
import {TimelinePeriod} from "../../types/types";
import {
    TimelinePointBox,
    StyledTimelinePoint,
    PeriodTitle,
    Point,
    PointNumber
} from './TimelinePoint.styles';

interface TimelinePointProps {
    period: TimelinePeriod;
    isActive: boolean;
    angleForBig: number;
    angleForSmall: number;
    onPeriodChange: (periodId: number) => void;
}



const TimelinePoint: React.FC<TimelinePointProps> = ({ period, isActive, angleForBig, angleForSmall, onPeriodChange }) => {
    console.log('timelinepoint')
    return (
        <TimelinePointBox key={period.id}>
            <StyledTimelinePoint
                $angleForBig={angleForBig}
                $angleForSmall={angleForSmall}
                $isActive={isActive}
                onClick={() => onPeriodChange(period.id)}
            >
                <PeriodTitle $isActive={isActive}> {period.title}</PeriodTitle>
                <Point $isActive={isActive} className="point">
                    <PointNumber
                        className="point-number"
                        $isActive={isActive}
                    >
                        {period.id}
                    </PointNumber>
                </Point>
            </StyledTimelinePoint>
        </TimelinePointBox>
    );
};

export default TimelinePoint;