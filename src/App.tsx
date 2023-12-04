import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { InputForm } from './components/InputForm';
import { GameList } from './components/GameList';
import { GameEdit } from './components/GameEdit';

export type Game = {
  id: number,
  image: string,
  title: string,
  genre: string,
  description: string,
  rating: string,
};

function App(): JSX.Element {
  const [games, setGames] = useState<Game[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect((): void => {
    axios.get('http://localhost:3001/games')
    .then((response) => {
      setGames(response.data);
    });
  }, []);

  const handleEditClick = (game: Game): void => {
    setIsEditing(true);
    setSelectedGame(game);
  };

  const addGame = (newGame: Game): void => {
    axios.post('http://localhost:3001/games', newGame)
    .then(() => {
      const updatedGameList = [...games, newGame];
      setGames(updatedGameList)
    });
  };

  const handleDelete = (gameDelete: Game): void => {
    
    axios.delete(`http://localhost:3001/games/${gameDelete.id}`)
      .then((): void => {
        const remainingGames = games.filter((game: Game): boolean => game.id !== gameDelete.id)
        setGames(remainingGames);
      });
  };

  const editGame = (editGame: Game): void => {
    axios.patch(`http://localhost:3001/games/${editGame.id}`, editGame)
      .then((response): void => {
        console.log(response);
        
        const editedGame = games.map((game) => 
          game.id === editGame.id ? {...game, ...editGame} : game
        )
        setGames(editedGame)
      })
  };

  return (
    <>
      <h1 className="header">Games to enjoy</h1>
      <div className="games">
        <div className="card-wrapper">
          <GameList games={games} handleDelete={handleDelete} handleEditClick={handleEditClick}/>
        </div>
        <InputForm addGame={addGame} games={games} initialGames={{title: '', genre: '', description: '', rating: ''}} editGame={editGame}/>
        {isEditing && <GameEdit game={selectedGame} editGame={editGame} addGame={addGame} games={games}/>}
      </div>
    </>
  );
}

export default App
