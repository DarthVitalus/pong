import React, { FC } from 'react';
import { useData } from './data';
import { GameCell } from './GameCell';
import { styled } from '@linaria/react';

const EmptyCell = styled.div``;
const PlayerColumn = styled.div`
  writing-mode: vertical-lr;
  max-height: 200px;
`;
const PlayerRow = styled.div`
  text-align: end;
  max-width: 200px;
`;
const SelfGame = styled.div``;
const TableContainer = styled.div<{ playersCount: number }>`
  display: grid;
  grid-template-columns: max-content repeat(
      ${({ playersCount }) => playersCount},
      max-content
    );
  grid-template-rows: max-content repeat(
      ${({ playersCount }) => playersCount},
      max-content
    );
  gap: 8px;

  > * {
    padding: 8px;
  }

  ${EmptyCell},
  ${PlayerColumn},
  ${PlayerRow},
  ${SelfGame} {
    background-color: #4d4d4d;
  }
`;

export const Table: FC = () => {
  const { players } = useData();

  if (!players.length) {
    return null;
  }

  return (
    <TableContainer playersCount={players.length}>
      <EmptyCell />
      {players.map((player) => (
        <PlayerColumn>{player}</PlayerColumn>
      ))}
      {players.map((playerRow) => (
        <>
          <PlayerRow>{playerRow}</PlayerRow>
          {players.map((playerColumn) =>
            playerRow === playerColumn ? (
              <SelfGame />
            ) : (
              <GameCell playerRow={playerRow} playerColumn={playerColumn} />
            ),
          )}
        </>
      ))}
    </TableContainer>
  );
};
Table.displayName = 'Table';
