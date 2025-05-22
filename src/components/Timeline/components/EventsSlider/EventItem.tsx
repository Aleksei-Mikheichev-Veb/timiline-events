import React from 'react';
import styled from "styled-components";
import {TimelineEvent} from "../../Timeline";

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

export default EventItem;