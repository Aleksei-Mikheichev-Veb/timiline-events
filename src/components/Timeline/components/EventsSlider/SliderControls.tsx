import React from 'react';
import styled from "styled-components";
import { Swiper as SwiperType } from 'swiper';
import ButtonsContainer from "../UI/ButtonsContainer";
import ArrowIcon from "../UI/ArrowIcon";

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


const ButtonSwiper = styled.button<{ isVisible?: boolean }>`
  border-radius: 50%;
  display:  flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #FFF;
  border: 1px solid #FFF;
  cursor:  pointer;
  opacity: ${props => props.isVisible ? 1 : 0};
  
  
  &:hover {
    background-color: ${props => props.disabled ? '#F4F5F9' : '#fff'};
  }
`;

interface SliderControlsProps {
    isBeginning: boolean;
    isEnd: boolean;
    eventSwiperRef: React.MutableRefObject<SwiperType | null>;
}

const SliderControls: React.FC<SliderControlsProps> = ({isBeginning, isEnd, eventSwiperRef}) => {
    return (
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
    );
};

export default SliderControls;