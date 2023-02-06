import React, { FC } from 'react';
import { Player, useData } from './data';
import { styled } from '@linaria/react';

const PlayerContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

type PlayerProps = {
  player: Player;
};

export const PlayerComponent: FC<PlayerProps> = ({ player }) => {
  const { removePlayer } = useData();

  return (
    <PlayerContainer>
      {player}
      <button type="button" onClick={() => removePlayer(player)}>
        x
      </button>
    </PlayerContainer>
  );
};
PlayerComponent.displayName = 'PlayerComponent';
