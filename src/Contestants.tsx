import React, { FC, useRef } from 'react';
import { styled } from '@linaria/react';
import { useData } from './data';
import { PlayerComponent } from './Player';

const ContestantsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 250px;
`;

export const Contestants: FC = () => {
  const { players, addPlayer } = useData();

  const playerInput = useRef<HTMLInputElement>(null);

  const onEnterPlayerName = (): void => {
    if (playerInput.current?.value) {
      addPlayer(playerInput.current?.value);
      playerInput.current.value = '';
    }
  };

  return (
    <ContestantsContainer>
      <input
        ref={playerInput}
        placeholder={'player name'}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            onEnterPlayerName();
          }
        }}
      />
      <button onClick={onEnterPlayerName}>add player</button>
      {players.map((player) => (
        <PlayerComponent key={player} player={player} />
      ))}
    </ContestantsContainer>
  );
};
Contestants.displayName = 'Contestants';
