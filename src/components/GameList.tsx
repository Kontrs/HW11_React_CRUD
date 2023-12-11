import React from 'react';
import { Game } from './App';

export const GameList = ({games, handleDelete, handleEditClick}) => {
  
  if (games.length === 0) {
    return (
        <p>No games to display</p>
    );
  }

  const ratingToStars = (rating) => {
    const starClass = 'rating__star';
    const ratingNum = Number(rating);
    const stars = Array.from({ length: ratingNum }, (_, index) => (
      <i className={`fas fa-star ${starClass}`} key={index}></i>
    ));
    return stars;
  };
  
  return(
    <>
      {games.map((game: Game): JSX.Element => (
        <div className='card' key={game.id}>
          <img className='card__image' src={game.image} alt='game-img'/>
          <h1 className='card__title'>{game.title}</h1>
          <p className='card__genre'>{game.genre}</p>
          <p className='card__description'>{game.description}</p>
          <div className='card__rating'>{ratingToStars(game.rating)}</div>
          <div className="card__buttons">
            <button onClick={() => handleEditClick(game)} className="buttons__edit">Edit</button>
            <button onClick={() => handleDelete(game)} className="buttons__delete">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

