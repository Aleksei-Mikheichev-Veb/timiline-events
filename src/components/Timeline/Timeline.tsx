import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper as SwiperClass } from 'swiper';
import { gsap } from 'gsap';
import CircleTimeline from "./components/CircleTimeline/CircleTimeline";
import EventsSlider from "./components/EventsSlider/EventsSlider";
import NavigationControls from "./components/Controls/NavigationControls";
import {TimelinePeriod} from "./types/types";


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
    const circleRef = useRef<HTMLDivElement | null>(null);
    const [rotationAngle, setRotationAngle] = useState<number>(-60);
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
        // Рассчитаем начальный угол, чтобы активный период находился в положении "1 час"
        const initialIndex = periods.findIndex(p => p.id === activePeriodId);
        if (initialIndex !== -1 && circleRef.current) {
            const totalPoints = periods.length;
            const anglePerPoint = 360 / totalPoints;
            const targetAngle = (initialIndex * anglePerPoint) -60;
            gsap.set(circleRef.current, {
                rotation: targetAngle,
                transformOrigin: "center center"
            });
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            isMobile.current = window.innerWidth <= 768;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const handlePeriodChange = (periodId: number) => {
        if (periodId === activePeriodId) return;

        const targetIndex = periods.findIndex(p => p.id === periodId);
        // Расчет угла
        const totalPoints = periods.length;
        const anglePerPoint = 360 / totalPoints;
        const targetAngle = -60 - (targetIndex * anglePerPoint);
        // Анимация для поворота круга
        if (circleRef.current) {
            gsap.to(circleRef.current, {
                rotation: targetAngle,
                // duration: 0.5,
                transformOrigin: "center center",
                ease: "linear",
                onComplete: () => {
                    setRotationAngle(targetAngle);
                    setActivePeriodId(periodId);
                }
            });
        }
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
                circleRef={circleRef}
                rotationAngle={rotationAngle}
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