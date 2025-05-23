import styled from "styled-components";

export const TimelinePointBox = styled.div`
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

export const StyledTimelinePoint = styled.div<{ $angleForBig: number; $angleForSmall: number; $isActive: boolean }>`
  position: relative;
  width: 56px;
  height: 56px;
  transform-origin: center;
  transform: ${({ $angleForBig, $angleForSmall }) => `rotate(${$angleForBig}deg) translate(265px) rotate(${$angleForSmall}deg)`};
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
    transform: ${({ $angleForBig, $angleForSmall }) => `rotate(${$angleForBig}deg) translate(225px) rotate(${$angleForSmall}deg)`};
  }
  @media (max-width: 900px) {
    transform: ${({ $angleForBig, $angleForSmall }) => `rotate(${$angleForBig}deg) translate(200px) rotate(${$angleForSmall}deg)`};
    width: 46px;
    height: 46px;
  }
`;
export const PeriodTitle = styled.h3<{ $isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: 130%;
  transform: translate(0, -50%);
  font-size: 20px;
  opacity: ${props => props.$isActive ? 1 : 0};
`
export const Point = styled.div<{ $isActive: boolean }>`
  width: ${props => props.$isActive ? '56px' : '6px'};
  height: ${props => props.$isActive ? '56px' : '6px'};
  border-radius: 50%;
  border: 1px solid rgba(48, 62, 88, 0.5);
  background-color: ${props => props.$isActive ? '#F4F5F9' : '#42567A'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 900px) {
    width: ${props => props.$isActive ? '46px' : '6px'};
    height: ${props => props.$isActive ? '46px' : '6px'};
  }
`;

export const PointNumber = styled.span<{ $isActive: boolean }>`
  color: #42567A;
  font-size: 20px;
  font-weight: 400;
  opacity: ${props => props.$isActive ? 1 : 0};
  transform: ${props => props.$isActive ? 'scale(1)' : 'scale(0)'};
  transition: all 0.3s ease;
`;
