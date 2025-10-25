import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    /* Glass Surfaces */
    --glass-white: rgba(255, 255, 255, 0.1);
    --glass-white-medium: rgba(255, 255, 255, 0.15);
    --glass-white-strong: rgba(255, 255, 255, 0.25);
    --glass-surface-light: rgba(255, 255, 255, 0.7);
    --glass-surface-medium: rgba(255, 255, 255, 0.5);
    --glass-surface-dark: rgba(255, 255, 255, 0.3);

    /* Backgrounds */
    --bg-gradient-primary: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #f8faff 100%);
    --bg-gradient-secondary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-gradient-accent: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

    /* Borders */
    --border-glass: rgba(255, 255, 255, 0.3);
    --border-glass-strong: rgba(255, 255, 255, 0.5);

    /* Shadows & Glows */
    --shadow-glass-sm: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --shadow-glass-md: 0 12px 48px 0 rgba(31, 38, 135, 0.20);
    --shadow-glass-lg: 0 20px 60px 0 rgba(31, 38, 135, 0.25);
    --glow-purple: 0 8px 32px rgba(102, 126, 234, 0.25);
    --glow-purple-strong: 0 12px 48px rgba(102, 126, 234, 0.35);

    /* Spacing */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    --space-2xl: 64px;

    /* Border Radius */
    --radius-sm: 12px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --radius-full: 9999px;

    /* Blur Levels */
    --blur-sm: blur(10px);
    --blur-md: blur(20px);
    --blur-lg: blur(30px);
    --blur-xl: blur(40px);
  }

  @font-face {
    font-family: "Moderat-Light";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url("/static/fonts/Moderat-Light.ttf");
  }

  @font-face {
    font-family: "Moderat-Regular";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("/static/fonts/Moderat-Regular.ttf");
  }

  @font-face {
    font-family: "Moderat-Medium";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("/static/fonts/Moderat-Medium.ttf");
  }

  @font-face {
    font-family: "Moderat-Bold";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("/static/fonts/Moderat-Bold.ttf");
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: 'Moderat-Regular', sans-serif !important;
    width: 100%;
    height: 100vh;
    color: #1a202c;
    background: #ffffff;
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
`

export default GlobalStyle
