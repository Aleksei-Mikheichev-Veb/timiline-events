import React from 'react';
import styled from "styled-components";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SliderControls from "./SliderControls";
import EventItem from "./EventItem";
import MobileDots from "../UI/MobileDots";
import {TimelinePeriod} from "../../types/types";

interface EventsSliderProps {
    activePeriod: TimelinePeriod;
    setIsEnd: (isEnd: boolean) => void;
    setIsBeginning: (isBeginning: boolean) => void;
    isBeginning: boolean;
    isEnd: boolean;
    eventSwiperRef: React.MutableRefObject<SwiperType | null>;
}

const EventsContainer = styled.div`
  margin-top: 70px;
  position: relative;
  z-index: 2;
  @media (max-width: 560px) {
    font-size: 56px;
    margin-top: 20px;
  }
`;

const SwiperContainer = styled.div`
  padding: 0 60px;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const EventsSlider: React.FC<EventsSliderProps> = ({activePeriod, isEnd, setIsEnd, isBeginning,setIsBeginning,eventSwiperRef}) => {
    return (
        <EventsContainer>
            <SliderControls isBeginning={isBeginning} isEnd={isEnd} eventSwiperRef={eventSwiperRef}/>
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
                <MobileDots/>
            </SwiperContainer>
        </EventsContainer>
    );
};

export default EventsSlider;