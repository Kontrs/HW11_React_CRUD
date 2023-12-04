import { InputForm } from './InputForm';

export const GameEdit = ({ game, editGame, addGame, games }) => (
    <div>
      <h2>Edit game</h2>
      <InputForm initialGames={game} editGame={editGame} addGame={addGame} games={games} />
    </div>
  );
    
