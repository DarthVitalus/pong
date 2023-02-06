import React, { FC } from 'react';
import { styled } from '@linaria/react';
import { useData } from './data';

const Divider = styled.div`
  width: 4px;
  background-color: #4d4d4d;
`;
const CurrentGameContainer = styled.div`
  display: flex;
  gap: 16px;
`;
const ContestantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const LeftContestant = styled(ContestantInfo)`
  align-items: end;
`;
const RightContestant = styled(ContestantInfo)`
  align-items: start;
`;
const Name = styled.span`
  font-size: 32px;
  color: hsl(144deg 63% 34%);
  white-space: nowrap;
`;
const Score = styled.span`
  font-size: 32px;
`;
const Buttons = styled.span`
  display: flex;
  gap: 8px;
`;

export const CurrentGame: FC = () => {
  const { currentGame, addPoint, removePoint } = useData();

  if (!currentGame) {
    return null;
  }

  const gameResults = Object.entries(currentGame).filter(
    ([key]) => key !== 'id',
  );

  const player1 = {
    name: gameResults[0][0],
    score: Number(gameResults[0][1]),
  };
  const player2 = {
    name: gameResults[1][0],
    score: Number(gameResults[1][1]),
  };

  return (
    <CurrentGameContainer>
      <LeftContestant>
        <Name>{player1.name}</Name>
        <Score>{player1.score}</Score>
        <Buttons>
          <button
            type="button"
            onClick={() => addPoint(currentGame.id, player1.name)}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => removePoint(currentGame.id, player1.name)}
          >
            -
          </button>
        </Buttons>
      </LeftContestant>
      <Divider />
      <RightContestant>
        <Name>{player2.name}</Name>
        <Score>{player2.score}</Score>
        <Buttons>
          <button
            type="button"
            onClick={() => addPoint(currentGame.id, player2.name)}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => removePoint(currentGame.id, player2.name)}
          >
            -
          </button>
        </Buttons>
      </RightContestant>
    </CurrentGameContainer>
  );
};
CurrentGame.displayName = 'CurrentGame';
