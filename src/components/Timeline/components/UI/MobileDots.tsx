import React from 'react';
import styled from "styled-components";

const StyledMobileDots = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
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


const MobileDots = () => {
    return (
        <StyledMobileDots className="swiper-pagination">

        </StyledMobileDots>
    );
};

export default MobileDots;