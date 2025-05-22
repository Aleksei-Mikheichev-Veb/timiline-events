import React from 'react';
import styled from "styled-components";
// import {Swiper} from "swiper/swiper-react";
import { Swiper as SwiperType } from 'swiper';
import ButtonsContainer from "../UI/ButtonsContainer";

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