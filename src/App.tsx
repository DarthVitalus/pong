import { Table } from './Table';
import { CurrentGame } from './CurrentGame';
import { Contestants } from './Contestants';

// TODO: scoreboard (player / games / wins / loses)
// TODO: reset game (with confirmation)
// TODO: save to file
// TODO: load from file
function App() {
  return (
    <>
      <Contestants />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Table />
        <CurrentGame />
      </div>
    </>
  );
}

export default App;
