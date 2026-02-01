import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import GameView from './components/GameView';

const GameContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <GameContainer>
        <GameView />
      </GameContainer>
    </>
  );
};

export default App;
