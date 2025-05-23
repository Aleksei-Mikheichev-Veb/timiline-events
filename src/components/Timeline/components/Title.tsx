import React from 'react';
import styled from "styled-components";

const StyledTitle = styled.h1`
  position: relative;
  top: 80px;
  left: 58px;
  color: #42567A;
  font-size: 40px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: -78px;
    height: 100%;
    width: 5px;
    background: linear-gradient(0deg, #EF5DA8 0%, #3877EE 100%);
  }
  @media (max-width: 1600px) {
    top: 30px;
  }
  @media (max-width: 1024px) {
    font-size: 35px;
    left: 28px;
    &:before {
      left: -48px;
      width: 4px;
    }
  }
  @media (max-width: 768px) {
    top: 50px;
    left: 28px;
    &:before {
      display: none;
    }
    @media (max-width: 400px) {
    font-size: 20px;
      left: 0px;
  }
`;

const Title = () => {
    return (
        <StyledTitle>
            Исторические<br/> события
        </StyledTitle>
    );
};

export default Title;