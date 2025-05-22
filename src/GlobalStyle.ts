import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'PT Sans', sans-serif;
    color: #42567A;
    background-color: #F4F5F9;
  }
  
  button {
    font-family: 'PT Sans', sans-serif;
  }
`;

export default GlobalStyle;