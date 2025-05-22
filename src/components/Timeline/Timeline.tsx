import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { gsap } from 'gsap';

// Types
interface TimelinePeriod {
    id: number;
    startYear: number;
    endYear: number;
    title: string;
    events: TimelineEvent[];
}

interface TimelineEvent {
    id: number;
    date: string;
    description: string;
}

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
const TimelinePoint = styled.div<{ angleForBig: number; angleForSmall: number; isActive: boolean }>`
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


const ControlsContainer = styled.div`
  position: absolute;
  bottom: 200px;
  left: 0;
  
  @media (max-width: 768px) {
    //position: relative;
    //margin-bottom: 40px;
    justify-content: flex-start;
    bottom:0;
    z-index: 10;
  }
`;

const Counter = styled.div`
  font-size: 14px;
  color: #42567A;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 50px;
  height: 50px;
  background-color: #F4F5F9;
  border-radius: 50%;
  border: 1px solid #42567A;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.disabled ? '#F4F5F9' : '#fff'};
  }
  @media (max-width: 450px) {
    width: 25px;
    height: 25px;
  }
`;
const ButtonSwiper = styled.button<{ isVisible?: boolean }>`
  width: 40px;
  height: 40px;
  background-color: #FFF;
  border-radius: 50%;
  border: 1px solid #FFF;
  cursor:  pointer;
  opacity: ${props => props.isVisible ? 1 : 0};
  display:  flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.disabled ? '#F4F5F9' : '#fff'};
  }
`;

type ArrowIconProps = {
    direction: "left" | "right";
};

const ArrowIcon = ({ direction }: ArrowIconProps) => {
    return (
        <StyledArrow viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            {direction === "left" ? (
                <path d="M8.5 0.5L9.5 1.5L4 7L9.5 12.5L8.5 13.5L2 7L8.5 0.5Z" fill="#42567A" />
            ) : (
                <path d="M5.5 0.5L4.5 1.5L10 7L4.5 12.5L5.5 13.5L12 7L5.5 0.5Z" fill="#42567A" />
            )}
        </StyledArrow>
    );
};

const StyledArrow = styled.svg`
  width: 7px;
  height: 7px;
`;

const EventsContainer = styled.div`
  margin-top: 70px;
  position: relative;
  z-index: 2;
  @media (max-width: 560px) {
    font-size: 56px;
    margin-top: 20px;
  }
`;

const EventSliderControls = styled.div`
  width: 100%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  @media (max-width: 768px) {
    display: none;
  }
`;



const MobileDots = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    //margin-top: 20px;
    text-align: center;
  }
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #42567A;
    opacity: 0.4;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
  @media (max-width: 430px) {
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }
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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
            <CircleContainer>
                <Circle ref={circleRef}>
                    {periods.map((period, index) => {
                        const angle = (index * (360 / periods.length));
                        const angleForSmall = -angle - rotationAngle
                        return (
                            <TimelinePointBox key={period.id}>
                                <TimelinePoint
                                    angleForBig={angle}
                                    angleForSmall={angleForSmall}
                                    isActive={period.id === activePeriodId}
                                    onClick={() => handlePeriodChange(period.id)}
                                >
                                    <Point isActive={period.id === activePeriodId}>
                                        <PointNumber
                                            isActive={period.id === activePeriodId}
                                        >
                                            {period.id}
                                        </PointNumber>
                                    </Point>
                                </TimelinePoint>
                            </TimelinePointBox>

                        );
                    })}
                </Circle>

                <YearsContainer>
                    {activePeriod && (
                        <>
                            <StartYear>{activePeriod.startYear}</StartYear>
                            <EndYear>{activePeriod.endYear}</EndYear>
                        </>
                    )}
                </YearsContainer>
            </CircleContainer>


            <ControlsContainer>
                <Counter>
                    {`0${activePeriodId}`}/{`0${periods.length}`}
                </Counter>
                <ButtonsContainer>
                    <Button
                        onClick={handlePrevPeriod}
                        disabled={activePeriodId === 1}
                    >
                        <ArrowIcon direction="left" />
                    </Button>
                    <Button
                        onClick={handleNextPeriod}
                        disabled={activePeriodId === periods.length}
                    >
                        <ArrowIcon direction="right" />
                    </Button>
                </ButtonsContainer>
            </ControlsContainer>

            {activePeriod && (
                <EventsContainer>
                        <EventSliderControls>
                            <ButtonsContainer>
                                <ButtonSwiper
                                    onClick={() => eventSwiperRef.current?.slidePrev()}
                                    isVisible={!isBeginning}
                                >
                                    <ArrowIcon direction="left" />
                                </ButtonSwiper>
                                <ButtonSwiper
                                    onClick={() => eventSwiperRef.current?.slideNext()}
                                    isVisible={!isEnd}
                                >
                                    <ArrowIcon direction="right" />
                                </ButtonSwiper>
                            </ButtonsContainer>
                        </EventSliderControls>

                        <SwiperContainer>
                            <Swiper

                                modules={[Pagination, Navigation]}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true
                                }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.7,
                                        spaceBetween: 20
                                    },
                                    600: {
                                        slidesPerView: 2.4,
                                        spaceBetween: 40
                                    },
                                    1024: {
                                        slidesPerView: 3.4,
                                        spaceBetween: 80
                                    }
                                }}
                                onSwiper={(swiper) => {
                                    eventSwiperRef.current = swiper;
                                    // Инициализируем состояния при монтировании
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                }}
                                onSlideChange={(swiper) => {
                                    // Обновляем состояния при изменении слайда
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                }}
                            >
                                {activePeriod.events.map(event => (
                                    <SwiperSlide key={event.id}>
                                        <EventItem event={event} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <MobileDots className="swiper-pagination"></MobileDots>
                        </SwiperContainer>
                </EventsContainer>
            )}
        </TimelineContainer>
    );
};


const SwiperContainer = styled.div`
  padding: 0 60px;
  @media (max-width: 768px) {
    padding: 0;
  }
`


const EventItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  gap: 15px;

  @media (max-width: 1200px) {
    width: 220px;
  }
  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
  @media (max-width: 450px) {
    max-width: 170px;
    //margin-bottom: 30px;
  }
`;

const EventDate = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #3877EE;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const EventDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #42567A;
`;

interface EventItemProps {
    event: TimelineEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    return (
        <EventItemContainer>
            <EventDate>{event.date}</EventDate>
            <EventDescription>{event.description}</EventDescription>
        </EventItemContainer>
    );
};

export default Timeline;