import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper as SwiperClass } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { gsap } from 'gsap';
import CircleTimeline from "./components/CircleTimeline/CircleTimeline";
import EventsSlider from "./components/EventsSlider/EventsSlider";
import ButtonsContainer from "./components/UI/ButtonsContainer";

// Types
export interface TimelinePeriod {
    id: number;
    startYear: number;
    endYear: number;
    title: string;
    events: TimelineEvent[];
}

export interface TimelineEvent {
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

// const ButtonsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 20px;
// `;

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
// const ButtonSwiper = styled.button<{ isVisible?: boolean }>`
//   width: 40px;
//   height: 40px;
//   background-color: #FFF;
//   border-radius: 50%;
//   border: 1px solid #FFF;
//   cursor:  pointer;
//   opacity: ${props => props.isVisible ? 1 : 0};
//   display:  flex;
//   align-items: center;
//   justify-content: center;
//
//   &:hover {
//     background-color: ${props => props.disabled ? '#F4F5F9' : '#fff'};
//   }
// `;
//
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

// const EventsContainer = styled.div`
//   margin-top: 70px;
//   position: relative;
//   z-index: 2;
//   @media (max-width: 560px) {
//     font-size: 56px;
//     margin-top: 20px;
//   }
// `;

// const EventSliderControls = styled.div`
//   width: 100%;
//   position: absolute;
//   right: 0;
//   top: 50%;
//   transform: translate(0, -50%);
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;


// const MobileDots = styled.div`
//   display: none;
//
//   @media (max-width: 768px) {
//     display: block;
//     //margin-top: 20px;
//     text-align: center;
//   }
//
//   .swiper-pagination-bullet {
//     width: 10px;
//     height: 10px;
//     background-color: #42567A;
//     opacity: 0.4;
//     margin: 0 5px;
//     cursor: pointer;
//   }
//
//   .swiper-pagination-bullet-active {
//     opacity: 1;
//   }
//   @media (max-width: 430px) {
//     .swiper-pagination-bullet {
//       width: 6px;
//       height: 6px;
//     }
//   }
// `;

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
            <CircleTimeline
                periods={periods}
                activePeriodId={activePeriodId}
                onPeriodChange={handlePeriodChange}
                circleRef={circleRef}
                rotationAngle={rotationAngle}
                activePeriod={activePeriod}/>

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
                <EventsSlider
                    activePeriod={activePeriod}
                    setIsEnd={setIsEnd}
                    setIsBeginning={setIsBeginning}
                    eventSwiperRef={eventSwiperRef}
                    isBeginning={isBeginning}
                    isEnd={isEnd}/>
                // <EventsContainer>
                //         <EventSliderControls>
                //             <ButtonsContainer>
                //                 <ButtonSwiper
                //                     onClick={() => eventSwiperRef.current?.slidePrev()}
                //                     isVisible={!isBeginning}
                //                 >
                //                     <ArrowIcon direction="left" />
                //                 </ButtonSwiper>
                //                 <ButtonSwiper
                //                     onClick={() => eventSwiperRef.current?.slideNext()}
                //                     isVisible={!isEnd}
                //                 >
                //                     <ArrowIcon direction="right" />
                //                 </ButtonSwiper>
                //             </ButtonsContainer>
                //         </EventSliderControls>
                //
                //         <SwiperContainer>
                //             <Swiper
                //
                //                 modules={[Pagination, Navigation]}
                //                 pagination={{
                //                     el: '.swiper-pagination',
                //                     clickable: true
                //                 }}
                //                 breakpoints={{
                //                     320: {
                //                         slidesPerView: 1.7,
                //                         spaceBetween: 20
                //                     },
                //                     600: {
                //                         slidesPerView: 2.4,
                //                         spaceBetween: 40
                //                     },
                //                     1024: {
                //                         slidesPerView: 3.4,
                //                         spaceBetween: 80
                //                     }
                //                 }}
                //                 onSwiper={(swiper) => {
                //                     eventSwiperRef.current = swiper;
                //                     // Инициализируем состояния при монтировании
                //                     setIsBeginning(swiper.isBeginning);
                //                     setIsEnd(swiper.isEnd);
                //                 }}
                //                 onSlideChange={(swiper) => {
                //                     // Обновляем состояния при изменении слайда
                //                     setIsBeginning(swiper.isBeginning);
                //                     setIsEnd(swiper.isEnd);
                //                 }}
                //             >
                //                 {activePeriod.events.map(event => (
                //                     <SwiperSlide key={event.id}>
                //                         <EventItem event={event} />
                //                     </SwiperSlide>
                //                 ))}
                //             </Swiper>
                //             <MobileDots className="swiper-pagination"></MobileDots>
                //         </SwiperContainer>
                // </EventsContainer>
            )}
        </TimelineContainer>
    );
};


// const SwiperContainer = styled.div`
//   padding: 0 60px;
//   @media (max-width: 768px) {
//     padding: 0;
//   }
// `

export default Timeline;