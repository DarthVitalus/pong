import React, { FC } from 'react';
import { styled } from '@linaria/react';
import { Player, useData } from './data';

const ErrorCell = styled.div`
  background-color: red;
`;
const GameCellContainer = styled.div`
  &[data-empty='true'] {
    background-color: #4d4d4d;
  }

  text-align: center;
  background-color: hsl(258deg 66% 35%);

  &:hover {
    background-color: hsl(258deg 66% 50%);
    cursor: pointer;
  }

  &[data-current='true'] {
    background-color: hsl(143, 70%, 32%);
  }
`;

type GameCellProps = {
  playerRow: Player;
  playerColumn: Player;
};

export const GameCell: FC<GameCellProps> = ({ playerColumn, playerRow }) => {
  const { games, currentGame, selectGame } = useData();
  const game = games.find(
    (game) => game[playerRow] !== undefined && game[playerColumn] !== undefined,
  );

  if (!game) {
    return <ErrorCell />;
  }

  const horizontalScore = game[playerRow];
  const verticalScore = game[playerColumn];
  const isCurrent = game.id === currentGame?.id;

  return (
    <GameCellContainer
      data-empty={!horizontalScore && !verticalScore}
      data-current={isCurrent}
      onClick={() => selectGame(game.id)}
    >
      {horizontalScore}
      {' / '}
      {verticalScore}
    </GameCellContainer>
  );
};
GameCell.displayName = 'GameCell';
