import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Player = string;
export type Game = Record<string, number> & {
  id: string;
};

const LOCAL_STORAGE_KEY = 'pong';

export type StoredData = {
  players: Player[];
  games: Game[];
};

export type AppData = StoredData & {
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  addPoint: (gameId: string, player: Player) => void;
  removePoint: (gameId: string, player: Player) => void;
  generateGames: () => void;
  currentGame: Game | null;
  selectGame: (gameId: string) => void;
};

const initialDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
let initialData: AppData = {
  players: [],
  games: [],
  addPlayer: () => null,
  removePlayer: () => null,
  addPoint: () => null,
  removePoint: () => null,
  generateGames: () => null,
  currentGame: null,
  selectGame: () => null,
};

if (initialDataStr) {
  try {
    initialData = { ...initialData, ...JSON.parse(initialDataStr) };
  } catch (e) {
    console.error(e);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export const getNewId = (): string => {
  let dt = new Date().getTime();

  return 'xxxxx'.replace(/[xy]/g, function changeToken(c) {
    /* eslint-disable no-bitwise */
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

// @ts-ignore
export const createGame = (player1: Player, player2: Player): Game => ({
  id: getNewId(),
  [player1]: 0,
  [player2]: 0,
});

export const DataContext = createContext<AppData>(initialData);

export const Data: FC<{ children: ReactElement }> = ({ children }) => {
  const [players, setPlayers] = useState(initialData.players);
  const [games, setGames] = useState(initialData.games);
  const [currentGameId, setCurrentGameId] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ players, games }));
  }, [players, games]);

  return (
    <DataContext.Provider
      value={{
        players,
        games,
        addPlayer: (player) => {
          setPlayers((current) => [...current, player]);
          setGames((current) => [
            ...current,
            ...players.map(
              (prevPlayer): Game => createGame(player, prevPlayer),
            ),
          ]);
        },
        removePlayer: (player) => {
          const confirmation = confirm('ARE YOU SURE???');
          if (!confirmation) {
            return;
          }
          setPlayers((current) => current.filter((pl) => pl !== player));
          setGames((current) =>
            current.filter((game) => game[player] === undefined),
          );
        },
        addPoint: (gameId, player) =>
          setGames((current) =>
            current.map((game) =>
              game.id !== gameId
                ? game
                : {
                    ...game,
                    [player]: game[player] + 1,
                  },
            ),
          ),
        removePoint: (gameId, player) =>
          setGames((current) =>
            current.map((game) =>
              game.id !== gameId
                ? game
                : {
                    ...game,
                    [player]: game[player] - 1,
                  },
            ),
          ),
        generateGames: () => {
          const confirmation = confirm('ARE YOU SURE???');
          if (!confirmation) {
            return;
          }
          const newGames: Game[] = players.flatMap((p1) =>
            players.filter((p2) => p1 !== p2).map((p2) => createGame(p1, p2)),
          );
          setGames(newGames);
        },
        currentGame: games.find(({ id }) => id === currentGameId) ?? null,
        selectGame: setCurrentGameId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): AppData => useContext(DataContext);
