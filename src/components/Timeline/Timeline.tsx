import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper as SwiperClass } from 'swiper';
import { gsap } from 'gsap';
import CircleTimeline from "./components/CircleTimeline/CircleTimeline";
import EventsSlider from "./components/EventsSlider/EventsSlider";
import NavigationControls from "./components/Controls/NavigationControls";
import {TimelinePeriod} from "./types/types";
import {useTimelineRotation} from "./hooks/useTimelineRotation";


interface TimelineProps {
    periods: TimelinePeriod[];
    initialPeriodId?: number;
}

// Styled Components
const TimelineContainer = styled.div`
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0px;
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

    const handlePrevPeriod = () => {
        const currentIndex = periods.findIndex(p => p.id === activePeriodId);
        if (currentIndex > 0) {
            handlePeriodChange(periods[currentIndex - 1].id);
        }
    };
    const handleNextPeriod = () => {
        const currentIndex = periods.findIndex(p => p.id === activePeriodId);
        if (currentIndex < periods.length - 1) {
            handlePeriodChange(periods[currentIndex + 1].id);
        }
    };

    return (
        <TimelineContainer>
            <CircleTimeline
                periods={periods}
                activePeriodId={activePeriodId}
                onPeriodChange={handlePeriodChange}
                activePeriod={activePeriod}/>

            <NavigationControls
                handlePrevPeriod={handlePrevPeriod}
                handleNextPeriod={handleNextPeriod}
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