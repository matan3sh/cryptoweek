import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
        font-family: "Moderat-Light";
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url("static/fonts/Moderat-Light.ttf");
    }
@font-face {
        font-family: "Moderat-Regular";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("static/fonts/Moderat-Regular.ttf");
    }
@font-face {
        font-family: "Moderat-Medium";
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url("static/fonts/Moderat-Medium.ttf");
    }
@font-face {
        font-family: "Moderat-Bold";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url("static/fonts/Moderat-Bold.ttf");
    }

*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: 'Moderat-Regular', sans-serif !important;
  width: 100%;
  height: 100vh;
  color: #fff;
  scroll-behavior: smooth;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
export default GlobalStyle;
