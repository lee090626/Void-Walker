import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #000000;
    --primary-color: #ffd700;
    --secondary-color: #c0c0c0;
    --text-color: #ffffff;
    --accent-color: #ff4500;
    --panel-bg: rgba(30, 30, 30, 0.85);
    --border-color: #444;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  canvas {
    display: block;
    image-rendering: pixelated;
  }
`;
