import React, {ReactNode} from 'react';
import styled from "styled-components";

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

interface ButtonsContainerProps {
    children: ReactNode;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
    return <StyledButtonsContainer>{children}</StyledButtonsContainer>;
};

export default ButtonsContainer;