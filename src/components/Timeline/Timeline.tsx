import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper as SwiperClass } from 'swiper';
import CircleTimeline from "./components/CircleTimeline/CircleTimeline";
import EventsSlider from "./components/EventsSlider/EventsSlider";
import NavigationControls from "./components/Controls/NavigationControls";
import {TimelinePeriod} from "./types/types";
import {useTimelineRotation} from "./hooks/useTimelineRotation";
import Title from "./components/Title";
import GlobalStyle from "../GlobalStyle";


interface TimelineProps {
    periods: TimelinePeriod[];
    initialPeriodId?: number;
}

// Styled Components
const TimelineContainer = styled.div`
  padding: 20px;
  position: relative;
  border: 1px solid rgba(66, 86, 122, 0.20);
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 100%;
    background: rgba(66, 86, 122, 0.20);
  }
  
  @media (max-width: 768px) {
    border: none;
    padding: 0px;
    &:before {
      display: none;
    }
  }
`;

const Timeline: React.FC<TimelineProps> = ({ periods }) => {
    const [activePeriodId, setActivePeriodId] = useState(1);
    const [activePeriod, setActivePeriod] = useState<TimelinePeriod | null>(null);
    const eventSwiperRef = useRef<SwiperClass | null>(null);

    const isMobile = useRef(window.innerWidth <= 768);

    // Состояния для кнопок навигации
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        const period = periods.find(p => p.id === activePeriodId);
        if (period) {
            setActivePeriod(period);
        }
    }, [activePeriodId, periods]);

    useEffect(() => {
        const handleResize = () => {
            isMobile.current = window.innerWidth <= 768;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { rotateTo } = useTimelineRotation({
        periods,
        activePeriodId,
        initialAngle: -60
    });
    const handlePeriodChange = (periodId: number) => {
        if (periodId === activePeriodId) return;
        rotateTo(periodId, () => {
            setActivePeriodId(periodId); // Обновляем состояние после анимации
        });
    };
    console.log('timeline')
    return (
        <TimelineContainer>
            <GlobalStyle />
            <Title/>
            <CircleTimeline
                periods={periods}
                activePeriodId={activePeriodId}
                onPeriodChange={handlePeriodChange}
                activePeriod={activePeriod}/>

            <NavigationControls
                periods={periods}
                onPeriodChange={handlePeriodChange}
                activePeriodId={activePeriodId}
                NumberOfPeriods={periods.length}/>

            {activePeriod && (
                <EventsSlider
                    activePeriod={activePeriod}
                    setIsEnd={setIsEnd}
                    setIsBeginning={setIsBeginning}
                    eventSwiperRef={eventSwiperRef}
                    isBeginning={isBeginning}
                    isEnd={isEnd}/>
            )}
        </TimelineContainer>
    );
};




export default Timeline;